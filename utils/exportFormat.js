import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import NProgress from 'nprogress';

const ffmpeg = createFFmpeg({ log: true });

const load = async () => {
  await ffmpeg.load();
  setReady(true);
};

async function exportFormat(mimType, length, setStateFunc, video) {
  const ext = mimType.split('/').pop();
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
  const dims = getPosition();

  await ffmpeg.setProgress(({ ratio }) => {
    NProgress.set(ratio);
    // console.log({ ratio });
    if (ratio === 1) {
      NProgress.done();
    }
  });

  // Run the FFMpeg command
  await ffmpeg.run(
    '-i',
    'test.mp4',
    '-t',
    `${length}`,
    '-ss',
    `${time}`,
    '-filter:v',
    `crop=${dims.width}:${dims.height}:${dims.left}:${dims.top}`,
    `out.${ext}`
  );

  //   // Read the result
  const data = await ffmpeg.FS('readFile', `out.${ext}`);
  // Create a URL
  const url = URL.createObjectURL(
    new Blob([data.buffer], { type: `${mimType}` })
  );

  await setStateFunc(url);
}

export default exportFormat;
