import { ref, push, set, onValue, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import toast from "react-hot-toast";

// Get a single Portfolio Item with multiple images and bilingual fields
export function getPortfolioItem({ id, setPortfolioItem }) {
    const itemRef = ref(db, 'portfolioItems/' + id);
    onValue(itemRef, (snapshot) => {
        if (snapshot.exists()) {
            const item = snapshot.val();
            setPortfolioItem({
                id: id,
                title_en: item.title_en,
                title_es: item.title_es,
                description_en: item.description_en,
                description_es: item.description_es,
                // Removed date property
                location_en: item.location_en,
                location_es: item.location_es,
                images: item.images || [],
                order: item.order !== undefined ? Number(item.order) : 0,
            });
        }
    });
}

// Get all Portfolio Items with multiple images and bilingual fields
export function getPortfolioItems(setPortfolioItems) {
    const itemsRef = ref(db, 'portfolioItems');
    onValue(itemsRef, (snapshot) => {
        if (snapshot.exists()) {
            const items = snapshot.val();
            const itemsArray = [];
            Object.entries(items).forEach(([key, value]) => {
                itemsArray.push({
                    id: key,
                    title_en: value.title_en,
                    title_es: value.title_es,
                    description_en: value.description_en,
                    description_es: value.description_es,
                    // Removed date property
                    location_en: value.location_en,
                    location_es: value.location_es,
                    images: value.images || [],
                    order: value.order !== undefined ? Number(value.order) : 0,  // Store order as number
                });
            });
            // Sort items by order in ascending order
            itemsArray.sort((a, b) => a.order - b.order);
            setPortfolioItems(itemsArray);
        }
    });
}

// Add a new Portfolio Item with multiple images upload and bilingual fields
export async function addPortfolioItem({ title_en, title_es, description_en, description_es, location_en, location_es, images, order }) {
    try {
        // Validate required fields (removed date validation)
        if (!title_en || !title_es || !description_en || !description_es || !location_en || !location_es) {
            toast.error('All fields are required');
            return false;
        }
        // Generate a new key for the portfolio item
        const newItemRef = push(ref(db, 'portfolioItems'));
        const newKey = newItemRef.key;
        let imageUrls = [];
        let uploadingToastId;
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `portfolioItems/${newKey}/${i}`);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        // Write the new portfolio item data, storing order as number.
        await set(newItemRef, {
            title_en,
            title_es,
            description_en,
            description_es,
            // Removed date property
            location_en,
            location_es,
            images: imageUrls,
            order: Number(order),
        });
        toast.success('Portfolio Item added successfully');
        return newKey;
    } catch (error) {
        toast.error('Error adding Portfolio Item');
        console.error('Error in addPortfolioItem:', error);
        return false;
    }
}

// Delete a Portfolio Item
export function deletePortfolioItem({ id }) {
    try {
        remove(ref(db, 'portfolioItems/' + id));
        toast.success('Portfolio Item deleted successfully');
    } catch (error) {
        toast.error('Error deleting Portfolio Item');
        console.error('Error in deletePortfolioItem:', error);
        return false;
    }
}

// Update an existing Portfolio Item with multiple images support and bilingual fields
export async function updatePortfolioItem({ id, title_en, title_es, description_en, description_es, location_en, location_es, images, order }) {
    try {
        // Validate required fields (removed date validation)
        if (!title_en || !title_es || !description_en || !description_es || !location_en || !location_es) {
            toast.error('All fields are required');
            return false;
        }
        let imageUrls = [];
        let uploadingToastId;
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `portfolioItems/${id}/${i}`);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        const itemRef = ref(db, 'portfolioItems/' + id);
        let updateData = {
            title_en,
            title_es,
            description_en,
            description_es,
            // Removed date property
            location_en,
            location_es,
            order: Number(order),
        };
        if (images && images.length > 0) {
            updateData.images = imageUrls;
        }
        await update(itemRef, updateData);
        toast.success('Portfolio Item updated successfully');
        return true;
    } catch (error) {
        toast.error('Error updating Portfolio Item');
        console.error('Error in updatePortfolioItem:', error);
        return false;
    }
}

// Update only the 'order' field of a Portfolio Item without modifying other fields
export async function updatePortfolioItemOrder({ id, order }) {
    try {
        const itemRef = ref(db, 'portfolioItems/' + id);
        await update(itemRef, { order: Number(order) });
        // toast.success('Order updated successfully');
        return true;
    } catch (error) {
        toast.error('Error updating order');
        console.error('Error in updatePortfolioItemOrder:', error);
        return false;
    }
} 

