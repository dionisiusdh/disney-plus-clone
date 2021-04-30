import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDBdWO9zKaQ2UjLW6XVmy69I9pP1rPJS-Y",
  authDomain: "disney-plus-clone-23ce8.firebaseapp.com",
  projectId: "disney-plus-clone-23ce8",
  storageBucket: "disney-plus-clone-23ce8.appspot.com",
  messagingSenderId: "715618917639",
  appId: "1:715618917639:web:032fb49095310b53cbf9a2",
  measurementId: "G-55TMYQ3TKT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
