import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import NProgress from 'nprogress';
import Router from 'next/router';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Layout from '../components/layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import theme from '../components/theme';
import withData from '../lib/withData';
import '../styles/nprogress.css';
import '../styles/globals.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const ffmpeg = createFFmpeg({ log: false });

function MyApp({ Component, apollo }) {
  const [ready, setReady] = useState('false');

  const [video, setVideo] = useState();
  const [filename, setFilename] = useState();
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(250);
  const [length, setLength] = useState(1);
  const [scale, setScale] = useState(1);
  const [json, setJson] = useState();
  const [shrink, setShrink] = useState(false);
  const [fieldData, setFieldData] = useState(false);

  useEffect(() => {
    const localStorageItems = [
      ['video', setVideo],
      ['filename', setFilename],
      ['cropWidth', setCropWidth],
      ['cropHeight', setCropHeight],
      ['length', setLength],
      ['scale', setScale],
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
            shrink={shrink}
            setShrink={setShrink}
            setFieldData={setFieldData}
            fieldData={fieldData}
          />
          <Component
            filename={filename}
            setFilename={setFilename}
            ffmpeg={ffmpeg}
            setCropWidth={setCropWidth}
            cropWidth={cropWidth}
            setCropHeight={setCropHeight}
            cropHeight={cropHeight}
            length={length}
            scale={scale}
            json={json}
            setJson={setJson}
            video={video}
            setVideo={setVideo}
            shrink={shrink}
            fieldData={fieldData}
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
