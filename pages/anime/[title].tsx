import { originalizeQueryParams } from "../../lib/utils/rectifiers";
import AnimeDetails from "../../components/AnimeDetails";
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function animeTitle({data}) {
  console.log(data)
  return (
    <div className="anime-title">
      <AnimeDetails data={data} />
    </div>
  );
}

export async function getServerSideProps({query: {title}}) {
  console.log(originalizeQueryParams(title).id);
  const GET_ANIME_QUERY = gql`
    query getAnime($id: Int!) {
      specificAnime(mal_id: $id) {
        title
        image_url_lg
        trailer_maxm
        mal_id
        episodes
        description
        trailer_embed
        image_url
        synopsis
      }
    }
  `;
  const {data} = await client.query({
    query: GET_ANIME_QUERY,
    variables: {id: originalizeQueryParams(title).id},
  });
  return {
    props: {
      data: data.specificAnime,
    },
  };
}
