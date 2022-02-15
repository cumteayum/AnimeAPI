import AnimeInterface from '../lib/interfaces/AnimeInterface';
import VanillaTilt from 'vanilla-tilt';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

function Hero({anime}: {anime: AnimeInterface}) {
  return (
  <div className="flex mt-4 ml-4 hero_section">
        <iframe
        title="video"
        width="560"
        height="315"
        src={anime.trailer_embed}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="mt-4 tilt"
        / >
        <div className="mt-4 ml-4 ">
          <Image className="tilt" src={anime.image_url_lg} height={315} width={230}/>
        </div>
      </div>
    )
}

function Episodes({list=12}) {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 25,
      speed: 400,
      glare: true,
    });
  }, []);
  return (
    new Array(list).fill(0).map((_, id)=> {
      return (
        <div data-tilt key={id} className="flex items-center justify-center w-12 h-12 mx-4 mt-2 ml-2 bg-gray-700 border-white hover:rounded-md hover:border hover:scale-110 duration-200 first:ml-0 hover:bg-gray-600">
          <p className="font-light text-center">{id+1}</p> 
        </div>
      );
    }) 
  );
}

export default function AnimeDetails({data: anime}: AnimeInterface) {
  return (
    <div className="flex flex-col">
      <Hero anime={anime} />
        <div className="mt-3 ml-4 text-2xl font-semibold sm:text-xl">
        <h1>{anime.title}</h1> 
        <h2 className="text-lg font-light">Episodes: {anime.episodes}</h2>
        <h2 className="text-lg font-light">Status: {anime.status ?? 'Completed'}</h2>
        <p className="mt-3 text-lg font-medium">Synopsis</p>
        <p className="mt-1 text-sm font-light">{anime.synopsis}</p>
        <div className="mt-2 text-lg font-medium">Episode List:</div>
        <div className="flex w-screen mb-8 flex-wrap">
          <Episodes list={anime.episodes}/>
        </div>
      </div>
    </div>
  );
}
