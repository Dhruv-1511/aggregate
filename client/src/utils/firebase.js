import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDuyfU_n__4L4JxlcL_nN8O2eOXTE5Pn2M",
  authDomain: "crud-img-a49c7.firebaseapp.com",
  projectId: "crud-img-a49c7",
  storageBucket: "crud-img-a49c7.appspot.com",
  messagingSenderId: "369213796637",
  appId: "1:369213796637:web:b9f0b3378e1b86db7e31f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);