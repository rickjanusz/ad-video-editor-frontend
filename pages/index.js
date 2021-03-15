import Head from "next/head";
import FFMPEG from "../components/FFMPEG";

export default function Home() {
  //   /**
  // Memory management
  // Each time you call createObjectURL(), a new object URL is created, even if you've already created one for the same object. Each of these must be released by calling URL.revokeObjectURL() when you no longer need them.
  //    */

  return (
    <>
      <div className="App">
        <Head>
          <title>Ad Video Editor</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FFMPEG />
      </div>
    </>
  );
}
