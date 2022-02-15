import Anime from './Anime';
import AnimeInterface from '../lib/interfaces/AnimeInterface';

export default function AnimeList({list, limit=4}) {
  return (
    <div className="mt-10 ml-10 grid md:grid-cols-3 lg:grid-cols-5 gap-4">
      {list.slice(0,limit).map((anime: AnimeInterface) => (
        <Anime key={anime.mal_id} {...anime} />
      ))}
    </div>
  );
}
