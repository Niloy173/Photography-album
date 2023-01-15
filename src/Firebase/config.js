
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_APP_ID
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timeStamp = serverTimestamp;

export {
  auth,
  projectFirestore,
  projectStorage,
  timeStamp,

};

