import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/layout';
import withData from '../lib/withData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFieldData } from '../utils/processData';
import '../styles/nprogress.css';
import '../styles/globals.css';

const theme = createMuiTheme({
  palette: {
    common: { black: '#000', white: '#fff' },
    background: {
      paper: 'rgba(244, 244, 244, 1)',
      default: 'rgba(242, 242, 242, 1)',
    },
    primary: {
      light: 'rgba(255, 161, 4, 1)',
      main: 'rgba(222, 108, 0, 1)',
      dark: 'rgba(172, 54, 0, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(225, 225, 225, 1)',
      main: 'rgba(128, 125, 123, 1)',
      dark: 'rgba(87, 87, 87, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },

  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
  },
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const ffmpeg = createFFmpeg({ log: true });
const fieldData = getFieldData();

function App({ Component, pageProps, apollo }) {
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
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <Layout>
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
        </Layout>
        <Footer />
      </ApolloProvider>
    </ThemeProvider>
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
