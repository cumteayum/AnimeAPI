import { db } from "../lib/firebaseHelpers";
import {BellIcon, AtSymbolIcon, ArchiveIcon, BadgeCheckIcon, TrashIcon, HomeIcon, LibraryIcon, CheckCircleIcon} from "@heroicons/react/outline";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import Image from "next/image";
import {updateDoc, collection, doc, getDocs, onSnapshot, deleteDoc} from "firebase/firestore"
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

const notify = () => toast.info("Click on the poster!", {theme: 'dark', icon: <BellIcon />, toastId: Math.random(), pauseOnHover: false, draggable: false});

function LocalAnimeList({bookmarks}) {
  const deleteBookmark = (el) => {
    const docRef = doc(db, 'bookmarks', el.id)
    deleteDoc(docRef)
      .then(res => toast.success("Bookmark deleted!", {theme: 'dark', icon: <TrashIcon />, toastId: Math.random(), pauseOnHover: false, draggable: false}))
      .catch(err => toast.error("Error deleting bookmark!", {theme: 'dark', icon: <TrashIcon />, toastId: Math.random(), pauseOnHover: false, draggable: false}))
  }

  const toggleWatched = el => {
    const docRef = doc(db, 'bookmarks', el.id)
    updateDoc(docRef, {
      isWatched: !el.data.isWatched
    })
      .then(res => {toast.success("Bookmark updated!", {theme: 'dark', icon: <CheckCircleIcon />, toastId: Math.random(), pauseOnHover: false, draggable: false}); })
      .catch(err => toast.error("Error updating bookmark!", {theme: 'dark', icon: <CheckCircleIcon />, toastId: Math.random(), pauseOnHover: false, draggable: false}))
  }

  return (
    <div className="flex flex-col items-center justify-center my-3 mb-4 md:grid grid-cols-4 md:gap-3">
      {bookmarks.map(el => (
        <div className="border-white h-[300px] group relative w-[200px] mb-6 hover:border hover:-translate-y-3 rounded duration-300">
          <Image className="" src={el.data.url} height={300} width={200}/>
          <div className="flex flex-row items-center justify-between first:ml-2 last:mr-2">
            <TrashIcon onClick={() => deleteBookmark(el)} className="inset-0 z-20 w-6 h-6 opacity-0 group-hover:opacity-100 hover:text-green-400 duration-300" />
          <ArchiveIcon className="inset-0 z-20 w-6 h-6 opacity-0 group-hover:opacity-100 hover:text-green-400 duration-300" />
          {el.data.isWatched ? <CheckCircleIcon className="inset-0 z-20 w-6 h-6 opacity-0 group-hover:opacity-100 hover:text-green-400 duration-300"/> : <BadgeCheckIcon onClick={() => toggleWatched(el)} className="inset-0 z-20 w-6 h-6 opacity-0 group-hover:opacity-100 hover:text-green-400 duration-300" />}
          <LibraryIcon className="inset-0 z-20 w-6 h-6 opacity-0 group-hover:opacity-100 hover:text-green-400 duration-300" />
        </div>
        </div>
      ))}
    </div>     
  );
}

  
function Toast(){
  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default function Bookmark() {
  const [bookmarks, setBookmarks] = useState([]);
  function getLocalBookmarks() {
      getDocs(collection(db, 'bookmarks'))
      .then(docs => {
        docs.forEach(doc => {
          setBookmarks(bookmarks => [...bookmarks, {data: doc.data(), id: doc.id, isWatched: false}])
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  function getRTLocalBookmarks() {
    onSnapshot(collection(db, 'bookmarks'), snapshot => {
      snapshot.docs.forEach(doc => setBookmarks(bookmarks => [...bookmarks, {data: doc.data(), id: doc.id, isWatched: false}]));
    })
  }
  useEffect(() => {
    // getLocalBookmarks();
    getRTLocalBookmarks();
    notify();
    return () => {
      setBookmarks([]);
    }
  }, []);
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-center">Your Watchlist</h1>
      <LocalAnimeList bookmarks={bookmarks} />
      <Toast />
    </div>
  );
}
