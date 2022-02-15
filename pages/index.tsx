import type {NextPage} from 'next';
import type {GetStaticProps, GetServerSideProps} from 'next';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import Anime from '../components/Anime';
import AnimeList from '../components/AnimeList';
import SearchBar from '../components/SearchBar';
import AnimeInterface from '../lib/interfaces/AnimeInterface';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function index({data: {topAnime}}: AnimeInterface[]) {
  console.log(topAnime)
  return (
    <>
      <SearchBar />
      <AnimeList list={topAnime} limit={80}/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const TOP_ANIMES_QUERY = gql`
    query {
      topAnime {
        title,
        image_url,
        episodes,
        trailer_yt,
        mal_id
      }
    }`;
  const {data} = await client.query({
    query: TOP_ANIMES_QUERY,
  });
  console.log(data)
  return {
    props: {
      data
    }
  }
}  
