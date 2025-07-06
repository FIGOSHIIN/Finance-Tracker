
import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 


const firebaseConfig = {
  apiKey: "AIzaSyBXIwGvfEZleBM-CS2xifc6z8JzNP8fqCE",
  authDomain: "mymoney-75b90.firebaseapp.com",
  projectId: "mymoney-75b90",
  storageBucket: "mymoney-75b90.firebasestorage.app",
  messagingSenderId: "882717967006",
  appId: "1:882717967006:web:6bd9727bb115a36654718f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = getFirestore(app);

const projectAuth = getAuth(app);

export { projectFirestore, projectAuth };