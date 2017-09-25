import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAqLjWwUqKB8MoIiCSGWRUWBRacedjYQf8",
  authDomain: "spirit-animal-demo.firebaseapp.com",
  databaseURL: "https://spirit-animal-demo.firebaseio.com",
  projectId: "spirit-animal-demo",
  storageBucket: "spirit-animal-demo.appspot.com",
  messagingSenderId: "286214989997"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
