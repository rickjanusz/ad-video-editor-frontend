import { gql } from 'graphql-tag';
import Head from 'next/head';
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
  // const { data, loading, error } = useQuery(ALL_VIDEOS_QUERY);
  // console.log({ mydata, myloading, myerror });

  return (
    <>
      <div className="App">
        <Head>
          <title>Video Cropper for Display Advertising</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FFMPEG props={props} />
      </div>
    </>
  );
}

export default Home;
