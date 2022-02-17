import {initializeApp} from 'firebase/app';
import {getDocs, doc, addDoc, onSnapshot, collection, getFirestore} from 'firebase/firestore';



const firebaseConfig = {

  apiKey: "AIzaSyAjgn6N4pHDSd7d9jeyDLlUqDhkKFkF-oA",

  authDomain: "animeapi-5b90e.firebaseapp.com",

  projectId: "animeapi-5b90e",

  storageBucket: "animeapi-5b90e.appspot.com",

  messagingSenderId: "935208702842",

  appId: "1:935208702842:web:b1f99e0e198b064d90bcc3"

};


const firebase = initializeApp(firebaseConfig);
const db = getFirestore()
const ref = collection(db, 'users');
const q = query(ref, where('name', '==', 'John'));

export default function anime() {
onSnapshot(ref, snapshot => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data());
  })
});

  addDoc(ref, {
    name: 'test',
    email: 'test'
  });

  return (
    <div>
      <h1>Anime</h1>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
