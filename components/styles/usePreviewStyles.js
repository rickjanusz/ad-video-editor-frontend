import { makeStyles } from '@material-ui/core';

const usePreviewStyles = makeStyles((theme) => ({
  preview: {
    background: theme.palette.primary.mainGradient,
    padding: '1em 0 8em 0',
  },
  previewHeader: {
    marginTop: '30px',
    color: theme.palette.secondary.light,
    // '&:before': {
    //   // content: ' // ',
    // },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default usePreviewStyles;
