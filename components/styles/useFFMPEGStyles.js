import { makeStyles } from '@material-ui/core';

const useFFMPEGStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  time: {
    backgroundColor: theme.palette.secondary.light,
    padding: '10px',
    borderRadius: '0 0 5px 5px',
  },
  videoContainer: {
    maxWidth: '1920px',
    maxHeight: '1080px',
    position: 'relative',
    resize: 'both',
    overflow: 'auto',
  },
  videoPolaroid: {
    backgroundColor: theme.palette.background.paper,
    border: `15px solid ${theme.palette.background.paper}`,
    marginBottom: '40px;',
    transition: '1s all',
    position: 'relative',
  },
  draggableParent: {
    width: '100%',
    height: '100%',
    // overflow: 'hidden',
    position: 'absolute',
    zIndex: 2,
    top: 0,
    pointerEvents: 'none',
  },
  draggy: {
    width: '150px',
    height: '150px',
    resize: 'both',
    // overflow: 'auto',
    border: '3px dotted rgba(255, 255, 255, 0.5)',
    boxShadow: '0 0 0px 2000px rgba(0, 0, 0, 0.7)',
  },
  handle: {
    height: '100%',
    pointerEvents: 'auto',
  },
  clip: {
    backgroundColor: theme.palette.secondary.dark,
    opacity: '.1',
    position: 'absolute',
    top: 0,
    zIndex: -2,
    left: '0',
    width: '2000px',
    height: '2000px',
    clipPath: 'polygon(21% 0%, 100% 10%,10% 100%, 0% 15%)',
    pointerEvents: 'none',
  },
  clip2: {
    backgroundColor: theme.palette.secondary.dark,
    opacity: '.5',
    position: 'absolute',
    top: 0,
    zIndex: -2,
    left: 0,
    width: '2000px',
    height: '2000px',
    clipPath: 'polygon(0% 0%, 0% 10%,100% 30%, 50% 100%)',
    pointerEvents: 'none',
  },
  wrapper: {
    position: 'relative',
    padding: theme.spacing(25),
    overflow: 'hidden',
    minHeight: '800px',
  },
  dropHere: {
    position: 'absolute',
    top: 150,
    left: 0,
    zIndex: 1,
    height: 'calc(100% - 125px)',
    width: '100%',
    pointerEvents: 'auto',
  },
  videoBox: {
    position: 'relative',
    zIndex: 2,
    top: '100px',
    pointerEvents: 'none',
  },
  buttonStyle: {
    pointerEvents: 'auto',
    margin: 5,
  },
  buttonGroup: {
    position: 'fixed',
    top: 110,
    left: 0,
    zIndex: 1000,
    padding: '10px 0',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  dimensions: {
    float: 'right',
  },
  widthDim: {
    marginRight: '10px',
  },
}));

export default useFFMPEGStyles;
