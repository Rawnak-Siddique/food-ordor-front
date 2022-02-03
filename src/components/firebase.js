import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAX2jKY7Im8OxNYbrqUBaS--shi37-Puxw",
  authDomain: "foodo-ordo.firebaseapp.com",
  projectId: "foodo-ordo",
  storageBucket: "foodo-ordo.appspot.com",
  messagingSenderId: "395192962558",
  appId: "1:395192962558:web:5a4e1c2e2d9cfd3e1f84af",
  measurementId: "G-VP9TW8YQYZ"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);