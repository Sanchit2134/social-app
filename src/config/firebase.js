"use client";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const { NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID
      } = {
        NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyCVXtums5mxAKetu15sBgiXAfK1qdcu5mk',
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'socail-d4427.firebaseapp.com',
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'socail-d4427',
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'socail-d4427.appspot.com',
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '47689209652',
        NEXT_PUBLIC_FIREBASE_APP_ID: '1:47689209652:web:613fb20340564acf6b3761'
      }
// web app's Firebase configuration

const firebaseConfig = {
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Database initialization
export const db = getFirestore(app)

//Storage initialization
export const storage = getStorage(app);