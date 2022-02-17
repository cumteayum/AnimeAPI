import {initializeApp} from 'firebase/app';
import {getDocs, doc, addDoc, onSnapshot, collection, getFirestore} from 'firebase/firestore';

interface Bookmark {
  title?: string;
  url?: string;
  mal_id?: string;
}

const firebaseConfig = {

  apiKey: "AIzaSyAjgn6N4pHDSd7d9jeyDLlUqDhkKFkF-oA",

  authDomain: "animeapi-5b90e.firebaseapp.com",

  projectId: "animeapi-5b90e",

  storageBucket: "animeapi-5b90e.appspot.com",

  messagingSenderId: "935208702842",

  appId: "1:935208702842:web:b1f99e0e198b064d90bcc3"

};


const firebase = initializeApp(firebaseConfig);
export const db = getFirestore()
export const userRef = collection(db, 'users');

export function getAllUsers() {
  return getDocs(userRef);
}

export function getAllBookmarks() {
  const bookmarks: Bookmark[] = [];
  getDocs(collection(db, 'bookmarks'))
  .then(snapshot => {
    snapshot.forEach(doc => {
      bookmarks.push(doc.data())
    });
  });
  return bookmarks ?? [{title: "No Bookmarks", url: "", mal_id: ""}];
}

export function addBookmark(bookmark: Bookmark) {
  return addDoc(collection(db, 'bookmarks'), bookmark);
}
