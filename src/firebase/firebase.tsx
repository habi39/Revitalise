import  firebase from 'firebase/app';
import { firebaseConfig } from '/Users/lkm/reactNativeProject/config.js';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

 

export default firebase;