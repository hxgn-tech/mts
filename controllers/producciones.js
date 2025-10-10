import { ref, push, set, onValue, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import toast from "react-hot-toast";

// Get all Producciones
export function getProducciones(setProducciones) {
    const produccionesRef = ref(db, 'producciones');
    onValue(produccionesRef, (snapshot) => {
        if (snapshot.exists()) {
            const producciones = snapshot.val();
            const produccionesArray = [];
            Object.entries(producciones).forEach(([key, value]) => {
                produccionesArray.push({
                    id: key,
                    nombre: value.nombre,
                    name: value.name,
                    ubicacion: value.ubicacion,
                    location: value.location,
                    descripcion: value.descripcion,
                    description: value.description,
                    images: value.images || [],
                    fecha: value.fecha,
                    categoria: value.categoria,
                    order: value.order !== undefined ? Number(value.order) : 0,
                });
            });
            // Sort producciones by order in ascending order
            produccionesArray.sort((a, b) => a.order - b.order);
            setProducciones(produccionesArray);
        }
    });
}

// Add a new Produccion
export async function addProduccion({ nombre, name, ubicacion, location, descripcion, description, images, fecha, categoria, order }) {
    try {
        // Validate required fields
        if (!nombre || !name || !ubicacion || !location || !descripcion || !description || !fecha || !categoria) {
            toast.error('All fields are required');
            return false;
        }
        
        // Generate a new key for the produccion
        const newProduccionRef = push(ref(db, 'producciones'));
        const newKey = newProduccionRef.key;
        let imageUrls = [];
        let uploadingToastId;
        
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `producciones/${newKey}/${i}`);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        
        // Write the new produccion data
        await set(newProduccionRef, {
            nombre,
            name,
            ubicacion,
            location,
            descripcion,
            description,
            images: imageUrls,
            fecha,
            categoria,
            order: Number(order),
        });
        
        toast.success('Produccion added successfully');
        return newKey;
    } catch (error) {
        toast.error('Error adding Produccion');
        console.error('Error in addProduccion:', error);
        return false;
    }
}

// Update an existing Produccion
export async function updateProduccion({ id, nombre, name, ubicacion, location, descripcion, description, images, fecha, categoria, order }) {
    try {
        // Validate required fields
        if (!nombre || !name || !ubicacion || !location || !descripcion || !description || !fecha || !categoria) {
            toast.error('All fields are required');
            return false;
        }
        
        let imageUrls = [];
        let uploadingToastId;
        
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `producciones/${id}/${i}`);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        
        const produccionRef = ref(db, 'producciones/' + id);
        let updateData = {
            nombre,
            name,
            ubicacion,
            location,
            descripcion,
            description,
            fecha,
            categoria,
            order: Number(order),
        };
        
        if (images && images.length > 0) {
            updateData.images = imageUrls;
        }
        
        await update(produccionRef, updateData);
        toast.success('Produccion updated successfully');
        return true;
    } catch (error) {
        toast.error('Error updating Produccion');
        console.error('Error in updateProduccion:', error);
        return false;
    }
}

// Delete a Produccion
export function deleteProduccion({ id }) {
    try {
        remove(ref(db, 'producciones/' + id));
        toast.success('Produccion deleted successfully');
    } catch (error) {
        toast.error('Error deleting Produccion');
        console.error('Error in deleteProduccion:', error);
        return false;
    }
}

// Update only the 'order' field of a Produccion
export async function updateProduccionOrder({ id, order }) {
    try {
        const produccionRef = ref(db, 'producciones/' + id);
        await update(produccionRef, { order: Number(order) });
        return true;
    } catch (error) {
        toast.error('Error updating order');
        console.error('Error in updateProduccionOrder:', error);
        return false;
    }
}