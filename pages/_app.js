import NProgress from "nprogress";
import Router from "next/router";
import Layout from "../components/layout";
import "../styles/globals.css";
import "../styles/nprogress.css";
import React, { useEffect, useState, useReducer } from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  const [ready, setReady] = useState("false");
  const [video, setVideo] = useState();
  const [crop, setCrop] = useState();
  const [gif, setGif] = useState();
  const [jpg, setJpg] = useState();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const localStorageItems = [
      ["video", setVideo],
      // ["crop", setCrop],
      // ["gif", setGif],
      // ["jpg", setJpg],
    ];

    localStorageItems.map((item) => {
      const ref = item[0];
      const func = item[1];
      const temp = localStorage.getItem(ref);
      if (temp) {
        // console.log("ref!!!!!!!!!!!!: ", temp);
        func(temp);
      }
    });
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
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
    <Layout>
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
        {...pageProps}
      />
    </Layout>
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

export default App;
