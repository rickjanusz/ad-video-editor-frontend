import { fetchFile } from '@ffmpeg/ffmpeg';
import FFMPEG from '../components/FFMPEG';
import FFMPEG from './';

async function exportFormat(mimType, mylength, stateFunc, video) {
  const ext = mimType.split('/').pop();
  FFMPEG.FS('writeFile', 'test.mp4', await fetchFile(video));
  const dims = getPosition();

  await ffmpeg.setProgress(({ ratio }) => {
    NProgress.set(ratio);
    if (ratio === 1) {
      NProgress.done();
    }
  });

  await ffmpeg.run(
    '-i',
    'test.mp4',
    '-t',
    `${mylength}`,
    '-ss',
    `${time}`,
    '-vf',
    `scale='trunc((ih/${scale})*dar/2)*2:trunc((ih/${scale})/2)*2',setsar=1/1,crop='${dims.width}:${dims.height}:${dims.left}:${dims.top}':exact=1`,
    '-c:a',
    'copy',
    '-an',
    `out.${ext}`
  );

  const fileBlob = ffmpeg.FS('readFile', `out.${ext}`);

  // Create a URL
  const url = URL.createObjectURL(
    new Blob([fileBlob.buffer], { type: `${mimType}`, autoRevoke: false })
  );

  stateFunc(url);
}

export default exportFormat;
