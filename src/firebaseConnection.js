import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD2zKrUiovaozZTQZ4bjrzK_eCbWz5ndW4",
    authDomain: "curso-be4e0.firebaseapp.com",
    projectId: "curso-be4e0",
    storageBucket: "curso-be4e0.appspot.com",
    messagingSenderId: "783197054691",
    appId: "1:783197054691:web:24085bb07077d5a70107d6",
    measurementId: "G-46YXNX36MR"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export { db, auth };