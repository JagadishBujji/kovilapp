import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWMklfkoB3Kt95_8i4w6XnQ6KscvjLlsY",
  authDomain: "templegrievance.firebaseapp.com",
  projectId: "templegrievance",
  storageBucket: "templegrievance.appspot.com",
  messagingSenderId: "799795262553",
  appId: "1:799795262553:web:28d104b3155248941bed48",
  measurementId: "G-6ZMTZ6X7KN",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export default firebaseApp;
export { auth, db, analytics, storage };
