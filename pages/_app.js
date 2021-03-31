import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/layout';
import withData from '../lib/withData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFieldData } from '../utils/processData';
import '../styles/nprogress.css';
import '../styles/globals.css';
import theme from '../components/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const ffmpeg = createFFmpeg({ log: true });
const fieldData = getFieldData();

function MyApp({ Component, pageProps, apollo }) {
  const [ready, setReady] = useState('false');
  const [video, setVideo] = useState();
  const [crop, setCrop] = useState();
  const [gif, setGif] = useState();
  const [jpg, setJpg] = useState();
  const [filename, setFilename] = useState();
  const [cropWidth, setCropWidth] = useState(336);
  const [cropHeight, setCropHeight] = useState(280);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(2);
  const [scale, setScale] = useState(1.2);

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

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
            theme={theme}
            {...pageProps}
          />
          <Footer />
        </ThemeProvider>
      </Layout>
    </ApolloProvider>
  );
}

export default withData(MyApp);
