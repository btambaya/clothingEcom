import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider  } from 'firebase/auth'
import { getFirestore, doc, getDoc, addDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcBYBUiYTPVAuBfQ-arJ9sO-VQN1JJ9O8",
    authDomain: "crwnclothingdb-bec17.firebaseapp.com",
    projectId: "crwnclothingdb-bec17",
    storageBucket: "crwnclothingdb-bec17.appspot.com",
    messagingSenderId: "498150480077",
    appId: "1:498150480077:web:39254cb77b7adf06b6b184"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db =getFirestore();

export const creatUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt= new Date();

        try {
            await setDoc(userDocRef, {displayName,email,createdAt});
            } catch (error){
            console.log("Error Creating the user", error.message);
        }


    }else
        return userDocRef;

}

