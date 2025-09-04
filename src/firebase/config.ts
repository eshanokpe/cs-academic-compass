import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyAG-4jjPEIpgndrbWqj7gGZN1yCEX-uSDc",
  authDomain: "dohmayn-7d063.firebaseapp.com",
  projectId: "dohmayn-7d063",
  storageBucket: "dohmayn-7d063.firebasestorage.app",
  messagingSenderId: "173548497414",
  appId: "1:173548497414:web:10c507bb01c8fccf76f187"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;