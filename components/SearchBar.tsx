import { createAvatar } from '@dicebear/avatars';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";
import * as style from '@dicebear/big-smile';
import SVG from 'react-inlinesvg';
import {useState, useCallback, useRef, useEffect} from 'react';
import {useRouter} from 'next/router';

let svg = createAvatar(style, {
  seed: `iamalazymansoidonthavethewilltowriteaseed${Math.abs(Math.random() * 10)}`,
  mouth: ['kawaii', 'openedSmile', 'braces', 'gapSmile'],
});
const mImage= "https://lh3.googleusercontent.com/a-/AOh14GhmflFbt31_VWUi4Q6foxv2QMabmNqBfL2lJyd_eg=s96-c";

export default function SearchBar() {
  const router = useRouter();
  const {data: session} = useSession();
  const [search, setSearch] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null)!;

  const slashFunction = useCallback(e => {
    if(e.key === 'k') {
      searchRef.current?.focus();
      setSearch('');
    };
    if(e.key === 'Enter') {
      console.log(search);
      router.push(`/search?q=${search}`);
    };
  }, [search]);

  useEffect(() => {
    document.addEventListener('keydown', slashFunction, false);
    return () => document.removeEventListener('keydown', slashFunction, false)
  }, [search]);

  const searchAnime = (animeName: string) => {
    console.log(animeName);
    router.push(`/search?q=${animeName}`);
  }

  return (
    <div className="flex justify-between mt-4 ml-10 search-bar flex-cols">
      <input ref={searchRef} type="text" value={search} onChange={e => setSearch(e.target.value)} name="search" placeholder="Search" className="px-3 py-2 text-gray-100 bg-gray-900 rounded-lg outline-none focus:outline-green-400 duration-200"/>
      <button className="px-3 py-1 border border-green-400 rounded-lg shadow-lg hover:text-gray-800 hover:bg-green-400 duration-200 hover:shadow-green-400/50" onClick={() => searchAnime(search)}>Search</button>

      <Link href={'/bookmarks'}>
        <button className="text-gray-100 px-2 py-[4px] rounded-lg border border-slate-200 hover:border-white duration-200 hover:bg-gray-200 hover:text-gray-900">Bookmarks</button>
      </Link>

    {session ? <div className="mr-16 md:mr-20"><Image onClick={() => {
      let res = confirm("Are you sure you want to log out?");
      if(res) {
        signOut()
      }
    }} src={session.user?.image ?? mImage} height={42} width={42} className="rounded-full"/></div> : <SVG onClick={() => signIn('google')} src={svg} className="mr-12 w-14 h-14"/> }
    </div>
  );
}
