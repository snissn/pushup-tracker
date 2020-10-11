import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Rebase from 're-base';

// Initialize Firebase

const config = {
  apiKey: 'AIzaSyBbsaU9yrArgJKxaJOTuDBA6W9Px7acVmg',
  authDomain: 'pushup-tracker-d706d.firebaseapp.com',
  databaseURL: 'https://pushup-tracker-d706d.firebaseio.com',
  projectId: 'pushup-tracker-d706d',
  storageBucket: 'pushup-tracker-d706d.appspot.com',
  messagingSenderId: '182441726720',
  appId: '1:182441726720:web:f2b6ea5f9f908c866399e5',
  measurementId: 'G-W2VX4GX263',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

const firestore = firebase.firestore();
const auth = firebase.auth();

const base = Rebase.createClass(firestore);

export default base;

// named export
export { firebase, auth, firestore };
