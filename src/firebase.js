import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDep5rh4PUE6nmVvTOa_e_tFhYJ6DmhBfo",
        authDomain: "messanger-app-e2a41.firebaseapp.com",
        projectId: "messanger-app-e2a41",
        storageBucket: "messanger-app-e2a41.appspot.com",
        messagingSenderId: "180601534923",
        appId: "1:180601534923:web:24b37f5d17b97432ee5e4e",
        measurementId: "G-S9SQQ969L6"
});

const db = firebaseApp.firestore();

export default db;
