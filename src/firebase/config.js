import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA1liD_g3HLJfHmQtXggNNZsVYUOx5KBs8',
  authDomain: 'mini-blog-react-45bc9.firebaseapp.com',
  projectId: 'mini-blog-react-45bc9',
  storageBucket: 'mini-blog-react-45bc9.appspot.com',
  messagingSenderId: '786304697359',
  appId: '1:786304697359:web:e45867b84814c16e4e0f7a',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
