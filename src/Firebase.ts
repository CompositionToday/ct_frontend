// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_API_AUTH_DOMAIN,
//     projectId: process.env.REACT_API_PROJECT_ID,
//     storageBucket: process.env.REACT_API_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_API_APP_ID,
//     appId: process.env.REACT_API_APP_ID,
//     measurementId: process.env.REACT_API_MEASUREMENT_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsEQifR_POL6ao09MNHJQy607I-gHTzyw",
    authDomain: "compositiontoday-ab1de.firebaseapp.com",
    projectId: "compositiontoday-ab1de",
    storageBucket: "compositiontoday-ab1de.appspot.com",
    messagingSenderId: "351582707394",
    appId: "1:351582707394:web:509611fd39432418a7e55b",
    measurementId: "G-WZFQNTC3DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();