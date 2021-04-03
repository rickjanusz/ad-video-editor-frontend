import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Layout from '../components/layout';
import withData from '../lib/withData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/nprogress.css';
import '../styles/globals.css';
import theme from '../components/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const ffmpeg = createFFmpeg({ log: false });

function MyApp({ Component, apollo }) {
  const [ready, setReady] = useState('false');
  const [video, setVideo] = useState();
  const [crop, setCrop] = useState();
  const [gif, setGif] = useState();
  const [jpg, setJpg] = useState();
  const [json, setJson] = useState();
  // const [png, setPng] = useState();
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

    localStorageItems.forEach((item) => {
      const ref = item[0];
      const func = item[1];
      const temp = localStorage.getItem(ref);
      if (temp) {
        func(temp);
      }
    });
    const load = async () => {
      await ffmpeg?.load();
      setReady(true);
    };

    load();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return ready ? (
    <ApolloProvider client={apollo}>
      <Layout>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            cropWidth={cropWidth}
            setCropWidth={setCropWidth}
            cropHeight={cropHeight}
            setCropHeight={setCropHeight}
            length={length}
            setLength={setLength}
            scale={scale}
            setScale={setScale}
            json={json}
          />
          <Component
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
            // png={png}
            // setPng={setPng}
            time={time}
            setTime={setTime}
            ffmpeg={ffmpeg}
            filename={filename}
            setFilename={setFilename}
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            length={length}
            scale={scale}
            json={json}
            setJson={setJson}
          />
          <Footer />
        </ThemeProvider>
      </Layout>
    </ApolloProvider>
  ) : (
    <p>Loading....</p>
  );
}

export default withData(MyApp);

MyApp.propTypes = {
  Component: PropTypes.any,
  apollo: PropTypes.any,
};
