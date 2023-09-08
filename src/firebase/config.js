import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: 'AIzaSyDAwDA6TKTLTTzdDE9qPwy249tljPI-lRk',
//     authDomain: 'miniblog-2c74e.firebaseapp.com',
//     projectId: 'miniblog-2c74e',
//     storageBucket: 'miniblog-2c74e.appspot.com',
//     messagingSenderId: '831531480933',
//     appId: '1:831531480933:web:5950d538710dad6f8fd38c',
//     measurementId: 'G-CXJW9FCHNL',
// };

// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

// export { db };

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCjVFUGy8O2AXDiewo20NeeJdqc2sPh6es',
    authDomain: 'miniblog-203b0.firebaseapp.com',
    projectId: 'miniblog-203b0',
    storageBucket: 'miniblog-203b0.appspot.com',
    messagingSenderId: '173975832825',
    appId: '1:173975832825:web:7cf13ecf37b90e44b43a28',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
