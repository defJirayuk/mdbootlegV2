import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCpVGQCP7RmCHXJVmir0wcCcGF6kGh4G4I",
  authDomain: "mdbootlegv2.firebaseapp.com",
  projectId: "mdbootlegv2",
  storageBucket: "mdbootlegv2.appspot.com",
  messagingSenderId: "8581703359",
  appId: "1:8581703359:web:effabec872b40f878ec80a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)