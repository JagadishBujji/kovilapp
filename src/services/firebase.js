import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEbwAO_r2pV01Z7YLhEAlSqP1EaJeJ-Ts",
  authDomain: "medcuore-sparkfun.firebaseapp.com",
  databaseURL:
    "https://medcuore-sparkfun-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "medcuore-sparkfun",
  storageBucket: "medcuore-sparkfun.appspot.com",
  messagingSenderId: "118335114395",
  appId: "1:118335114395:web:c247ffd4d0e5303dc54a3e",
  measurementId: "G-NH1K14D4M5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export default firebaseApp;
export { auth, db, analytics, storage };
