import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getApps, getApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDym6lQ6UaDIIoLky7y3_RIMdhtVXV-4Qg",
    authDomain: "mts-agency-ar.firebaseapp.com",
    projectId: "mts-agency-ar",
    storageBucket: "mts-agency-ar.firebasestorage.app",
    messagingSenderId: "1089794567897",
    appId: "1:1089794567897:web:6c2e1ea279932d2f8598c8"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);
export const storage = getStorage(app);