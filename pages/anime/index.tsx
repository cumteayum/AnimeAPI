export default function anime() {
  return (
    <div>
      <h1>Anime</h1>
    </div>
  );
}

export async function getServerSideProps({query, res}) {
  console.log(query)
  return {
    props: {},
  };
}
