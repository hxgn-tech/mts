import { ref, push, set, onValue, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import toast from "react-hot-toast";

// Get all Venues with bilingual fields
export function getVenues(setVenues) {
    const venuesRef = ref(db, 'venues');
    onValue(venuesRef, (snapshot) => {
        if (snapshot.exists()) {
            const venues = snapshot.val();
            const venuesArray = [];
            Object.entries(venues).forEach(([key, value]) => {
                venuesArray.push({
                    id: key,
                    nombre: value.nombre,
                    name: value.name,
                    descripcion: value.descripcion,
                    description: value.description,
                    ubicacion: value.ubicacion,
                    images: value.images || [],
                    order: value.order !== undefined ? Number(value.order) : 0,
                });
            });
            // Sort venues by order in ascending order
            venuesArray.sort((a, b) => a.order - b.order);
            setVenues(venuesArray);
        }
    });
}

// Add a new Venue
export async function addVenue({ nombre, name, descripcion, description, ubicacion, images, order }) {
    try {
        // Validate required fields
        if (!nombre || !name || !descripcion || !description || !ubicacion) {
            toast.error('All fields are required');
            return false;
        }
        
        // Generate a new key for the venue
        const newVenueRef = push(ref(db, 'venues'));
        const newKey = newVenueRef.key;
        let imageUrls = [];
        let uploadingToastId;
        
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `venues/${newKey}/${i}`);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        
        // Write the new venue data
        await set(newVenueRef, {
            nombre,
            name,
            descripcion,
            description,
            ubicacion,
            images: imageUrls,
            order: Number(order),
        });
        
        toast.success('Venue added successfully');
        return newKey;
    } catch (error) {
        toast.error('Error adding Venue');
        console.error('Error in addVenue:', error);
        return false;
    }
}

// Update an existing Venue
export async function updateVenue({ id, nombre, name, descripcion, description, ubicacion, images, order }) {
    try {
        // Validate required fields
        if (!nombre || !name || !descripcion || !description || !ubicacion) {
            toast.error('All fields are required');
            return false;
        }
        
        let imageUrls = [];
        let uploadingToastId;
        
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `venues/${id}/${i}`);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        
        const venueRef = ref(db, 'venues/' + id);
        let updateData = {
            nombre,
            name,
            descripcion,
            description,
            ubicacion,
            order: Number(order),
        };
        
        if (images && images.length > 0) {
            updateData.images = imageUrls;
        }
        
        await update(venueRef, updateData);
        toast.success('Venue updated successfully');
        return true;
    } catch (error) {
        toast.error('Error updating Venue');
        console.error('Error in updateVenue:', error);
        return false;
    }
}

// Delete a Venue
export function deleteVenue({ id }) {
    try {
        remove(ref(db, 'venues/' + id));
        toast.success('Venue deleted successfully');
    } catch (error) {
        toast.error('Error deleting Venue');
        console.error('Error in deleteVenue:', error);
        return false;
    }
}

// Update only the 'order' field of a Venue
export async function updateVenueOrder({ id, order }) {
    try {
        const venueRef = ref(db, 'venues/' + id);
        await update(venueRef, { order: Number(order) });
        return true;
    } catch (error) {
        toast.error('Error updating order');
        console.error('Error in updateVenueOrder:', error);
        return false;
    }
}