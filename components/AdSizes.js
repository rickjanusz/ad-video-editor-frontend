import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import AdSize from './AdSize';

const AdGrid = styled.div``;

export default function AdSizes({ props, forwardedRef }) {
  // initialize ref array
  const canvasRefs = useRef([]);
  const { fieldData } = props;

  // OFF SCREEN RENDERING
  // const osRef = useRef();
  // Loop through ad sizes and for each create a dynamic ref
  canvasRefs.current = fieldData.map(
    (sizeData, i) => canvasRefs.current[i] ?? React.createRef()
  );

  // console.log(canvasRefs.current);
  const ctxArr = [];
  // const lsImg = getDimensions('lifestyle_img', tmData[0]);
  // console.log(lsImg);
  //  console.log(canvasRefs);

  useEffect(() => {
    const vid = forwardedRef.current;

    // TODO: :::::::::::::::::::::::::::::::::::::  PRERENDER FUNCTION
    // TODO -- Canvas is hooked up to video SEE osRef canvas in return
    // TODO -- Need to figure out how to render off screen and copy...
    // TODO -- instance to other canvases, this should be a huge...
    // TODO -- performance win
    // TODO: :::::::::::::::::::::::::::::::::::::  PRERENDER FUNCTION

    // function prerenderVideo() {
    //   const ctx = osRef.current.getContext('2d');
    //   ctx.drawImage(
    //     vid,
    //     0, //  left
    //     0, //  top
    //     720, //  width
    //     400 //  height
    //   );
    // }

    // function step() {
    //   prerenderVideo();
    //   requestAnimationFrame(step);
    // }
    // requestAnimationFrame(step);

    // vid.addEventListener('play', () => {
    //   requestAnimationFrame(step);
    // });

    // <canvas ref={osRef} width="720" height="400" />
    // TODO: :::::::::::::::::::::::::::::::::::::  END PRERENDER FUNCTION
    // TODO: :::::::::::::::::::::::::::::::::::::  END PRERENDER FUNCTION

    // ::::::::::::::::::::::::::::::::::::::::::::::  Working code
    // ::::::::::::::::::::::::::::::::::::::::::::::  Not optimized
    // ::::::::::::::::::::::::::::::::::::::::::::::  Needs off screen rendering
    // ::::::::::::::::::::::::::::::::::::::::::::::  SEE osRef VAR ABOVE

    // Loop through all refs (1 per canvas) and create video context
    // function drawCtxImage() {
    //   canvasRefs.current.forEach((canvas, i) => {
    //     // if (lsImg[i]) {
    //     ctxArr[i] = canvas.current?.getContext('2d');
    //     ctxArr[i].drawImage(
    //       vid,
    //       0, // crop left
    //       0, // crop top
    //       lsImg[i]?.dims.width, // crop width
    //       lsImg[i]?.dims.height, // crop height
    //       lsImg[i]?.dims.left, // left
    //       lsImg[i]?.dims.top, // top
    //       lsImg[i]?.dims.width, // width
    //       lsImg[i]?.dims.height // height
    //     );
    //     // }
    //   });
    // }

    // Redraw video frames to canvas
    // function step() {
    //   drawCtxImage();
    //   requestAnimationFrame(step);
    // }

    // Populate videos right away
    // requestAnimationFrame(step);

    // // Listen for scrub or play
    // vid.addEventListener('play', () => {
    //   requestAnimationFrame(step);
    // });

    // ::::::::::::::::::::::::::::::::::::::::::::::  //
    // ::::::::::::::::::::::::::::::::::::::::::::::  //
    // ::::::::::::::::::::::::::::::::::::::::::::::  Working code
    // ::::::::::::::::::::::::::::::::::::::::::::::  SEE NOTES ABOVE
    // ::::::::::::::::::::::::::::::::::::::::::::::  //
    // ::::::::::::::::::::::::::::::::::::::::::::::  //
  }, []);

  // console.log('FORRRWARRDDED!!!! ', forwardedRef.current);
  return (
    <AdGrid>
      {fieldData.map((ad, i) => {
        console.log({ ad });
        return (
          <AdSize sizeData={ad} key={ad.size}>
            <canvas
              ref={canvasRefs.current[i]}
              width={ad.numX}
              height={ad.numY}
            />
          </AdSize>
        );
      })}
    </AdGrid>
  );
}

AdSizes.propTypes = {
  forwardedRef: PropTypes.object,
  props: PropTypes.any,
};
