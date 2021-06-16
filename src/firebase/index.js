import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCMBiaQtXdBmNJX8m6Wj0mhF2eBajwiJMo",
    authDomain: "tetris-data-fabdb.firebaseapp.com",
    projectId: "tetris-data-fabdb",
    storageBucket: "tetris-data-fabdb.appspot.com",
    messagingSenderId: "669655975321",
    appId: "1:669655975321:web:afb82beac89792d4e67f08"
});
export function getFirebase() {
    return app;
}
export function getFirestore() {
    return firebase.firestore(app);
}