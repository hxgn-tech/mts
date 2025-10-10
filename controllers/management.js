import { ref, push, set, onValue, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import toast from "react-hot-toast";

// Get all Management items
export function getManagementItems(setManagementItems) {
    const managementRef = ref(db, 'management');
    onValue(managementRef, (snapshot) => {
        if (snapshot.exists()) {
            const management = snapshot.val();
            const managementArray = [];
            Object.entries(management).forEach(([key, value]) => {
                managementArray.push({
                    id: key,
                    nombre: value.nombre,
                    descripcion: value.descripcion,
                    description: value.description,
                    nacionalidad: value.nacionalidad,
                    nationality: value.nationality,
                    linkRedes: value.linkRedes,
                    imagen: value.imagen,
                    pressKit: value.pressKit,
                    spotify: value.spotify,
                    order: value.order !== undefined ? Number(value.order) : 0,
                });
            });
            // Sort management items by order in ascending order
            managementArray.sort((a, b) => a.order - b.order);
            setManagementItems(managementArray);
        }
    });
}

// Add a new Management item
export async function addManagementItem({ nombre, descripcion, description, nacionalidad, nationality, linkRedes, imagen, pressKit, spotify, order }) {
    try {
        // Validate required fields
        if (!nombre || !descripcion || !description || !nacionalidad || !nationality) {
            toast.error('All required fields must be filled');
            return false;
        }
        
        // Generate a new key for the management item
        const newItemRef = push(ref(db, 'management'));
        const newKey = newItemRef.key;
        let imageUrl = '';
        let pressKitUrl = '';
        let uploadingToastId;
        
        if (imagen) {
            uploadingToastId = toast.loading("Uploading image, please wait...");
            const imageStorageRef = storageRef(storage, `management/${newKey}/imagen`);
            const uploadResult = await uploadBytes(imageStorageRef, imagen);
            imageUrl = await getDownloadURL(uploadResult.ref);
            toast.dismiss(uploadingToastId);
        }
        
        if (pressKit) {
            if (!uploadingToastId) uploadingToastId = toast.loading("Uploading press kit, please wait...");
            const pressKitStorageRef = storageRef(storage, `management/${newKey}/pressKit`);
            const uploadResult = await uploadBytes(pressKitStorageRef, pressKit);
            pressKitUrl = await getDownloadURL(uploadResult.ref);
            toast.dismiss(uploadingToastId);
        }
        
        // Write the new management item data
        await set(newItemRef, {
            nombre,
            descripcion,
            description,
            nacionalidad,
            nationality,
            linkRedes: linkRedes || '',
            imagen: imageUrl,
            pressKit: pressKitUrl,
            spotify: spotify || '',
            order: Number(order),
        });
        
        toast.success('Management item added successfully');
        return newKey;
    } catch (error) {
        toast.error('Error adding Management item');
        console.error('Error in addManagementItem:', error);
        return false;
    }
}

// Update an existing Management item
export async function updateManagementItem({ id, nombre, descripcion, description, nacionalidad, nationality, linkRedes, imagen, pressKit, spotify, order }) {
    try {
        // Validate required fields
        if (!nombre || !descripcion || !description || !nacionalidad || !nationality) {
            toast.error('All required fields must be filled');
            return false;
        }
        
        let imageUrl = '';
        let pressKitUrl = '';
        let uploadingToastId;
        
        if (imagen) {
            uploadingToastId = toast.loading("Uploading image, please wait...");
            const imageStorageRef = storageRef(storage, `management/${id}/imagen`);
            const uploadResult = await uploadBytes(imageStorageRef, imagen);
            imageUrl = await getDownloadURL(uploadResult.ref);
            toast.dismiss(uploadingToastId);
        }
        
        if (pressKit) {
            if (!uploadingToastId) uploadingToastId = toast.loading("Uploading press kit, please wait...");
            const pressKitStorageRef = storageRef(storage, `management/${id}/pressKit`);
            const uploadResult = await uploadBytes(pressKitStorageRef, pressKit);
            pressKitUrl = await getDownloadURL(uploadResult.ref);
            toast.dismiss(uploadingToastId);
        }
        
        const managementRef = ref(db, 'management/' + id);
        let updateData = {
            nombre,
            descripcion,
            description,
            nacionalidad,
            nationality,
            linkRedes: linkRedes || '',
            spotify: spotify || '',
            order: Number(order),
        };
        
        if (imagen) {
            updateData.imagen = imageUrl;
        }
        
        if (pressKit) {
            updateData.pressKit = pressKitUrl;
        }
        
        await update(managementRef, updateData);
        toast.success('Management item updated successfully');
        return true;
    } catch (error) {
        toast.error('Error updating Management item');
        console.error('Error in updateManagementItem:', error);
        return false;
    }
}

// Delete a Management item
export function deleteManagementItem({ id }) {
    try {
        remove(ref(db, 'management/' + id));
        toast.success('Management item deleted successfully');
    } catch (error) {
        toast.error('Error deleting Management item');
        console.error('Error in deleteManagementItem:', error);
        return false;
    }
}

// Update only the 'order' field of a Management item
export async function updateManagementOrder({ id, order }) {
    try {
        const managementRef = ref(db, 'management/' + id);
        await update(managementRef, { order: Number(order) });
        return true;
    } catch (error) {
        toast.error('Error updating order');
        console.error('Error in updateManagementOrder:', error);
        return false;
    }
}