import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDRYfo1HgTPqO_GICG6FRCcvC9VhIZxqd0',
  authDomain: 'next-chat-app-ca757.firebaseapp.com',
  databaseURL: 'https://next-chat-app-ca757-default-rtdb.firebaseio.com',
  projectId: 'next-chat-app-ca757',
  storageBucket: 'next-chat-app-ca757.appspot.com',
  messagingSenderId: '790260425184',
  appId: '1:790260425184:web:e90ee10d0d58943b6b0b85',
  measurementId: 'G-3TT9QFY3HH',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

export default firebase;
