import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import FirebaseModule from 'firebase/app';
import config from '../config';

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
