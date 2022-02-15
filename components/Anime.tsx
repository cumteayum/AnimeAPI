import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {BookmarkIcon} from '@heroicons/react/outline'
import {BookmarkIcon as BookmarkSolid} from '@heroicons/react/solid'
import {rectifyQueryParams as rectify} from '../lib/utils/rectifiers';
import { pushRectifiedQueryParam } from '../lib/utils/rectifiers';
import AnimeInterface from '../lib/interfaces/AnimeInterface';

export default function Anime({title, episodes, image_url, description, score, mal_id}: AnimeInterface) {
  const router = useRouter();
  const pushQuery = (str: string, id: number | string) => router.push(`/anime/${pushRectifiedQueryParam(str, id)}`);
  return <>
  <div onClick={() => pushQuery(title, mal_id)} className="relative rounded-lg cursor-pointer group h-[300px] w-[200px] hover:border border-white mb-12 hover:scale-110 duration-300">
        <div>
          <Image src={image_url} alt={title} width={200} height={300} className="absolute rounded-lg duration-200"/>
        </div>
        <div className="flex justify-start flex-cols">
        <h1 className="inset-0 z-10 w-40 font-semibold opacity-0 md:text-xs sm:text-xs lg:text-sm group-hover:opacity-100 duration-300 ">{title}</h1>
        <BookmarkIcon className="inset-0 z-20 w-4 h-4 opacity-0 group-hover:opacity-100 hover:text-green-400 duration-300" />
      </div>
    </div>
  </>
}
