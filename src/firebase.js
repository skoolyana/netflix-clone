import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore} from 'firebase/firestore'
import { getAuth} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLaTqh7f2XH784ayCWsHvriwjurOq41Zg",
    authDomain: "netflix-clone-ca409.firebaseapp.com",
    projectId: "netflix-clone-ca409",
    storageBucket: "netflix-clone-ca409.appspot.com",
    messagingSenderId: "1026956867195",
    appId: "1:1026956867195:web:d14afe720eb862db2954de",
    measurementId: "G-SX8BK90F7Y"
  };

  const firebaseApp = firebase.default.initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth =  getAuth(firebaseApp);
  export {db,auth};