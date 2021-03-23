import { useQuery, useRef } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import AdSizes from '../components/AdSizes';
import FFMPEG from '../components/FFMPEG';

const ALL_VIDEOS_QUERY = gql`
  query ALL_VIDEOS_QUERY {
    allUsers {
      name
      email
    }
  }
`;

function Home(props) {
  const { data, loading, error } = useQuery(ALL_VIDEOS_QUERY);
  // console.log({ mydata, myloading, myerror });

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
        <AdSizes />
      </div>
    </>
  );
}

export default Home;
