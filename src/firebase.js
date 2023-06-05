import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgKCvJH1dBY4tBVJsr7V2DJkp-A1HCabc",
  authDomain: "upload-file-a9022.firebaseapp.com",
  projectId: "upload-file-a9022",
  storageBucket: "upload-file-a9022.appspot.com",
  messagingSenderId: "166867400436",
  appId: "1:166867400436:web:3d84d25404b0a80edf10a1",
  measurementId: "G-LGM2LB7DH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app); 