import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import FirebaseModule from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBlxUkCX8OPsb9QL2p_jN8vaHdb5LhsS7A',
  authDomain: 'open-fintech.firebaseapp.com',
  databaseURL: 'https://open-fintech.firebaseio.com',
  projectId: 'open-fintech',
  storageBucket: 'open-fintech.appspot.com',
  messagingSenderId: '1001643033524',
  measurementId: 'G-CECMRG504L'
};

let firebaseInitialized;
FirebaseModule.initializeApp(config);
firebaseInitialized = true;

let db;
let storage;

if (firebaseInitialized) {
  // Initialize Cloud Firestore through Firebase
  db = FirebaseModule.firestore();
  // Initialize Storage through Firebase
  storage = FirebaseModule.storage();
}

export const Firebase = firebaseInitialized ? FirebaseModule : null;
export const FirebaseDB = firebaseInitialized ? db : null;
export const FirebaseStorage = firebaseInitialized ? storage : null;
