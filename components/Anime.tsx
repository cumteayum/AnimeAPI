import Image from 'next/image';
import { useState, useEffect } from 'react';
import {db, getAllBookmarks} from '../lib/firebaseHelpers';
import { useRouter } from 'next/router';
import {BookmarkIcon} from '@heroicons/react/outline'
import {BookmarkIcon as BookmarkSolid} from '@heroicons/react/solid'
import {rectifyQueryParams as rectify} from '../lib/utils/rectifiers';
import { pushRectifiedQueryParam } from '../lib/utils/rectifiers';
import AnimeInterface from '../lib/interfaces/AnimeInterface';

interface Bookmark {
  title?: string;
  url?: string;
  mal_id?: string;
}

export default function Anime({title, episodes, image_url, description, score, mal_id}: AnimeInterface) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const pushQuery = (str: string, id: number | string) => router.push(`/anime/${pushRectifiedQueryParam(str, id)}`);
  const handleBookmark = (e: Event): void => {
    e.preventDefault();
  };
  useEffect(() => {
    setBookmarks(getAllBookmarks());
  }, []);
  return <>
  <div className="relative rounded-lg hover:-translate-y-3 cursor-pointer group h-[300px] w-[200px] hover:border border-white mb-12 duration-300">
    <div onClick={() => pushQuery(title, mal_id)} > 
          <Image src={image_url} alt={title} width={200} height={300} className="absolute rounded-lg duration-200"/>
        </div>
        <div className="flex justify-start flex-cols">
        <h1 className="inset-0 z-10 w-40 font-semibold opacity-0 md:text-xs sm:text-xs lg:text-sm group-hover:opacity-100 duration-300 ">{title}</h1>
        <BookmarkIcon onClick={e => handleBookmark(e)} className="inset-0 z-20 w-6 h-6 opacity-0 group-hover:opacity-100 hover:text-green-400 duration-300" />
      </div>
    </div>
  </>
}
