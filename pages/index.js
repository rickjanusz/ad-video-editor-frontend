import { useQuery, useRef } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import FfMpeg from '../components/FfMpeg';

const ALL_VIDEOS_QUERY = gql`
  query ALL_VIDEOS_QUERY {
    allUsers {
      name
      email
    }
  }
`;

function Home(props) {
  // const { data, loading, error } = useQuery(ALL_VIDEOS_QUERY);
  // console.log({ mydata, myloading, myerror });

  return (
    <>
      <div className="App">
        <Head>
          <title>Ad Video Editor</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FfMpeg props={props} />
      </div>
    </>
  );
}

export default Home;
