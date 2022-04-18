import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgxPPKHYABW4wMCKpQKAaNzc2O9DBbUMc",
    authDomain: "nftwhiteliste.firebaseapp.com",
    projectId: "nftwhiteliste",
    storageBucket: "nftwhiteliste.appspot.com",
    messagingSenderId: "27068715347",
    appId: "1:27068715347:web:a30753bb0b8917866391a6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;