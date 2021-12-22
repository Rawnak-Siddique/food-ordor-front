import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCsltLMTTAgriZ9G6wTxcv_0OiELlTvQeo",
  authDomain: "foodo-ordoru.firebaseapp.com",
  projectId: "foodo-ordoru",
  storageBucket: "foodo-ordoru.appspot.com",
  messagingSenderId: "534802612140",
  appId: "1:534802612140:web:b09494b789c402c6eb4409",
  measurementId: "G-L5PHM1XBZP"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);