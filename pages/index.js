import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import FFMPEG from '../components/FFMPEG';

const ALL_VIDEOS_QUERY = gql`
  query ALL_VIDEOS_QUERY {
    allUsers {
      name
      email
    }
  }
`;

const Home = (props) => {
  // console.log({ props });
  const { data, loading, error } = useQuery(ALL_VIDEOS_QUERY);
  console.log({ data, loading, error });

  return (
    <>
      <div className="App">
        <Head>
          <title>Ad Video Editor</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Link href="/page">
          <a>Page</a>
        </Link>
        <FFMPEG props={props} />
      </div>
    </>
  );
};

export default Home;
