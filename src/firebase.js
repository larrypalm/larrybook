import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCHkpzQPedSPgvRL5NmfWdRMRU4_cn1dr0",
  authDomain: "larry-db.firebaseapp.com",
  databaseURL: "https://larry-db.firebaseio.com",
  projectId: "larry-db",
  storageBucket: "larry-db.appspot.com",
  messagingSenderId: "405517290218"
};
firebase.initializeApp(config);

export default firebase;
