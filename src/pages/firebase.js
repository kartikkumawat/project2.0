import { initializeApp, getApps } from "firebase/app";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as dbRef, set, get } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeRxiaCvYkmiV_u4WFTumZGvSaKhMM9Co",
  authDomain: "project-d8e08.firebaseapp.com",
  projectId: "project-d8e08",
  storageBucket: "project-d8e08.appspot.com",
  messagingSenderId: "806115713905",
  appId: "1:806115713905:web:2fa6e1cbd29cf02b5e4cd0",
  databaseURL: "https://project-d8e08-default-rtdb.firebaseio.com/",
};

// Initialize Firebase app only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let storage;
try {
  // Initialize Firebase services
  storage = getStorage(app);
} catch (error) {
  console.error("Error initializing storage:", error);
}

const database = getDatabase(app);

// Export Firebase services
export {
  storage,
  storageRef,
  uploadBytes,
  getDownloadURL,
  set,
  database,
  dbRef,
  get,
};