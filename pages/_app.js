import React, { useEffect, useState, useReducer } from 'react';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import Layout from '../components/layout';
import withData from '../lib/withData';
import Header from '../components/Header';
import { getFieldData } from '../utils/processData';
import '../styles/nprogress.css';
import '../styles/globals.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const ffmpeg = createFFmpeg({ log: true });
const fieldData = getFieldData();

function App({ Component, pageProps, apollo }) {
  // console.log(apollo);
  const [ready, setReady] = useState('false');
  const [video, setVideo] = useState();
  const [crop, setCrop] = useState();
  const [gif, setGif] = useState();
  const [jpg, setJpg] = useState();
  const [filename, setFilename] = useState();
  const [cropWidth, setCropWidth] = useState();
  const [cropHeight, setCropHeight] = useState();
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(2);
  const [scale, setScale] = useState(1);

  // console.log(fieldData);

  useEffect(() => {
    const localStorageItems = [
      ['video', setVideo],
      ['filename', setFilename],
      ['cropWidth', setCropWidth],
      ['cropHeight', setCropHeight],
      ['length', setLength],
      ['scale', setScale],
      // ["crop", setCrop],
      // ['gif', setGif],
      // ['jpg', setJpg],
    ];

    load();

    localStorageItems.map((item) => {
      const ref = item[0];
      const func = item[1];
      const temp = localStorage.getItem(ref);
      if (temp) {
        func(temp);
      }
    });
  }, []);

  const load = async () => {
    await ffmpeg?.load();
    setReady(true);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };
  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });

  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Header />
        <Component
          data={data}
          dispatch={dispatch}
          ready={ready}
          setReady={setReady}
          video={video}
          setVideo={setVideo}
          crop={crop}
          setCrop={setCrop}
          gif={gif}
          setGif={setGif}
          jpg={jpg}
          setJpg={setJpg}
          time={time}
          setTime={setTime}
          ffmpeg={ffmpeg}
          filename={filename}
          setFilename={setFilename}
          fieldData={fieldData}
          cropWidth={cropWidth}
          setCropWidth={setCropWidth}
          cropHeight={cropHeight}
          setCropHeight={setCropHeight}
          length={length}
          setLength={setLength}
          scale={scale}
          setScale={setScale}
          {...pageProps}
        />
      </Layout>
    </ApolloProvider>
  );
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
