import Head from "next/head";
import Link from "next/link";
import FFMPEG from "../components/FFMPEG";

const Home = (props) => {
  // console.log({ props });

  return (
    <>
      <div className="App">
        <Head>
          <title>Ad Video Editor</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Link href={"/page"}>
          <a>Page</a>
        </Link>
        <FFMPEG props={props} />
      </div>
    </>
  );
};

export default Home;
