import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBVj8JXo7l8_azoqUD5ApCUhMOtq4mcTp4",
  authDomain: "chat-x-000.firebaseapp.com",
  projectId: "chat-x-000",
  storageBucket: "chat-x-000.appspot.com",
  messagingSenderId: "850263747667",
  appId: "1:850263747667:web:4761ef7e2351678def2aa6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
