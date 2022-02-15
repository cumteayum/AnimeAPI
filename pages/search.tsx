import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import AnimeList from '../components/AnimeList';
import Anime from '../components/Anime';
import { GetServerSideProps } from 'next';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import { useRouter } from 'next/router';
import AnimeInterface from '../lib/interfaces/AnimeInterface';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function search({data: {searchAnime: animes}}: AnimeInterface[]) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>
      <SearchBar />
      <button onClick={() => router.replace('/')} className="px-2 py-2 mt-2 ml-10 bg-green-400 border-white rounded-md hover:bg-green-500 hover:border">Go Back</button>
      <div>
        <AnimeList list={animes} limit={animes.length - 1}/>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SEARCH = gql`
    query searchAnime($searchStr: String!) {
      searchAnime(search: $searchStr) {
        title
        mal_id
        image_url
        trailer_yt
      }
    }`;
  const {data} = await client.query({
    query: SEARCH,
    variables: {
      searchStr: context.query.q,
    },
  });
  return {
    props: {
      data
    },
  };
};
