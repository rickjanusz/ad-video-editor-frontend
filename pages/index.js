import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import FFMPEG from '../components/FFMPEG';
import tmData from '../data/treatmentData';

const ALL_VIDEOS_QUERY = gql`
  query ALL_VIDEOS_QUERY {
    allUsers {
      name
      email
    }
  }
`;

const Home = (props) => {
  function getDimensions(field, data) {
    const dims = data.map((data) => {
      if (data.name === field) {
        const newObj = {
          size: `${data.sizeX}x${data.sizeY}`,
          top: data.top,
          left: data.left,
          width: data.width,
          height: data.height,
        };
        return console.table(field, newObj);
      }
    });
  }

  // getDimensions('lifestyle_img', tmData[0]);
  // getDimensions('subhead_text', tmData[0]);
  // getDimensions('headline_text', tmData[0]);

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
      </div>
    </>
  );
};

export default Home;
