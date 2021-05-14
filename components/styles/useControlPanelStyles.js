import { makeStyles } from '@material-ui/core';

const useControlPanelStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.primary.main,
    border: '2px solid rgba(234, 234, 234, 1)',
    height: 90,
    width: 90,
    transform: 'rotate(90deg)',
  },
  appBar: {
    // background: theme.palette.secondary.mainGradient,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    marginBottom: theme.spacing(0),
    position: 'fixed',
    zIndex: 3,
    width: '100vw',
  },
  headerIcon: {
    width: 42,
    height: 42,
  },
}));
export default useControlPanelStyles;
