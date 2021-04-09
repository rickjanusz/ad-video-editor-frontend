import { makeStyles } from '@material-ui/core';

const useFooterStyles = makeStyles((theme) => ({
  root: {},
  clip: {
    backgroundColor: theme.palette.secondary.light,
    opacity: '1',
    position: 'absolute',
    top: 0,
    zIndex: -1,
    left: '0',
    width: '2000px',
    height: '2000px',
    clipPath: 'polygon(0 0, 0% 30%,100% 0%, 30% 100%)',
  },
  clip2: {
    backgroundColor: theme.palette.secondary.dark,
    opacity: '.3',
    position: 'absolute',
    top: 0,
    zIndex: -1,
    left: 10,
    width: '2000px',
    height: '2000px',
    clipPath: 'polygon(0 0, 0% 100%,100% 100%, 0% 30%)',
  },
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  card: {
    margin: '0 20px',
  },
}));
export default useFooterStyles;
