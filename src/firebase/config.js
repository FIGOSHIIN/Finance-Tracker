import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "API-KEY",
  authDomain: "mymoney-75b90.firebaseapp.com",
  projectId: "mymoney-75b90",
  storageBucket: "mymoney-75b90.firebasestorage.app",
  messagingSenderId: "882717967006",
  appId: "API-ID"
};

const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);

export { projectFirestore, projectAuth, Timestamp };
