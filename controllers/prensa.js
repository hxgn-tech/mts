// controllers/prensa.js

import { ref, push, set, onValue, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import toast from "react-hot-toast";

// Function to get a single Press Item by id with bilingual fields
export function getPressItem({ id, setPressItem }) {
    const itemRef = ref(db, 'prensa/' + id);
    onValue(itemRef, (snapshot) => {
        if (snapshot.exists()) {
            const item = snapshot.val();
            setPressItem({
                id: id,
                title_en: item.title_en,
                title_es: item.title_es,
                subtitle_en: item.subtitle_en,
                subtitle_es: item.subtitle_es,
                text_en: item.text_en,
                text_es: item.text_es,
                date: item.date,
                images: item.images || [],
                file: item.file || "", // new field for PDF file URL
            });
        }
    });
}

// Function to get all Press Items with bilingual fields
export function getPressItems(setPressItems) {
    const itemsRef = ref(db, 'prensa');
    onValue(itemsRef, (snapshot) => {
        if (snapshot.exists()) {
            const items = snapshot.val();
            const itemsArray = [];
            Object.entries(items).forEach(([key, value]) => {
                itemsArray.push({
                    id: key,
                    title_en: value.title_en,
                    title_es: value.title_es,
                    subtitle_en: value.subtitle_en,
                    subtitle_es: value.subtitle_es,
                    text_en: value.text_en,
                    text_es: value.text_es,
                    date: value.date,
                    images: value.images || [],
                    file: value.file || "", // new field for PDF file URL
                });
            });
            setPressItems(itemsArray);
        }
    });
}

// Function to add a new Press Item with multiple images and PDF file upload with bilingual fields
export async function addPressItem({ title_en, title_es, subtitle_en, subtitle_es, text_en, text_es, date, images, file }) {
    try {
        // Check for required fields; file is required for new press items
        if (!title_en || !title_es || !subtitle_en || !subtitle_es || !text_en || !text_es || !date ) {
            Debug.LogError('All fields are required');
            toast.error('All fields are required');
            return false;
        }
        const newItemRef = push(ref(db, 'prensa'));
        const newKey = newItemRef.key;
        let imageUrls = [];
        let uploadingToastId;
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `prensa/${newKey}/${i}`);
                console.log("Uploading image", i, "for new press item:", newKey);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                console.log("Image", i, "URL obtained:", imageUrl);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        // Upload PDF file
        let fileUrl = "";
        if (file) {
            console.log("Uploading PDF file for new press item:", newKey);
            const fileStorageRef = storageRef(storage, `prensa/${newKey}/file`);
            const fileUploadResult = await uploadBytes(fileStorageRef, file);
            fileUrl = await getDownloadURL(fileUploadResult.ref);
            console.log("PDF file URL obtained:", fileUrl);
        }
        await set(newItemRef, {
            title_en,
            title_es,
            subtitle_en,
            subtitle_es,
            text_en,
            text_es,
            date,
            images: imageUrls,
            file: fileUrl,
        });
        console.log("New press item added with key:", newKey);
        toast.success('Press item added successfully');
        return newKey;
    } catch (error) {
        toast.error('Error adding press item');
        Debug.LogError("Error in addPressItem:" + error);
        console.error('Error in addPressItem:', error);
        return false;
    }
}

// Function to update an existing Press Item with multiple images and optional PDF file update with bilingual fields
export async function updatePressItem({ id, title_en, title_es, subtitle_en, subtitle_es, text_en, text_es, date, images, file }) {
    try {
        // Check for required fields; file update is optional during update
        if (!title_en || !title_es || !subtitle_en || !subtitle_es || !text_en || !text_es || !date) {
            Debug.LogError('All fields are required');
            toast.error('All fields are required');
            return false;
        }
        let imageUrls = [];
        let uploadingToastId;
        if (images && images.length > 0) {
            uploadingToastId = toast.loading("Uploading images, please wait...");
            for (let i = 0; i < images.length; i++) {
                const imageFile = images[i];
                const imageStorageRef = storageRef(storage, `prensa/${id}/${i}`);
                console.log("Uploading updated image", i, "for press item:", id);
                const uploadResult = await uploadBytes(imageStorageRef, imageFile);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                console.log("Updated image", i, "URL obtained:", imageUrl);
                imageUrls.push(imageUrl);
            }
            toast.dismiss(uploadingToastId);
        }
        const itemRef = ref(db, 'prensa/' + id);
        let updateData = {
            title_en,
            title_es,
            subtitle_en,
            subtitle_es,
            text_en,
            text_es,
            date,
        };
        if (images && images.length > 0) {
            updateData.images = imageUrls;
        }
        // Update PDF file if a new file is provided
        if (file) {
            console.log("Uploading updated PDF file for press item:", id);
            const fileStorageRef = storageRef(storage, `prensa/${id}/file`);
            const fileUploadResult = await uploadBytes(fileStorageRef, file);
            const fileUrl = await getDownloadURL(fileUploadResult.ref);
            console.log("Updated PDF file URL obtained:", fileUrl);
            updateData.file = fileUrl;
        }
        await update(itemRef, updateData);
        toast.success('Press item updated successfully');
        return true;
    } catch (error) {
        toast.error('Error updating press item');
        Debug.LogError("Error in updatePressItem:" + error);
        console.error('Error in updatePressItem:', error);
        return false;
    }
}

// Function to delete a Press Item
export function deletePressItem({ id }) {
    try {
        remove(ref(db, 'prensa/' + id));
        toast.success('Press item deleted successfully');
    } catch (error) {
        toast.error('Error deleting press item');
        Debug.LogError("Error in deletePressItem:" + error);
        console.error('Error in deletePressItem:', error);
        return false;
    }
}
