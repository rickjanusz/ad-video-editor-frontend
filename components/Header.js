import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CropOutlinedIcon from '@material-ui/icons/CropOutlined';
// import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Nav from './Nav';

export default function Header({ theme }) {
  const useStyles = makeStyles(() => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
      height: 100,
      width: 100,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      {/* <Avatar className={classes.avatar}>
        <CropOutlinedIcon style={{ height: 50, width: 50 }} />
      </Avatar>
      <Typography component="h1" variant="h6">
        L7
      </Typography> */}
    </div>
  );
}
