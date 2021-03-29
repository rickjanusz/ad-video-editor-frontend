import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SwapHorizontalCircleSharpIcon from '@material-ui/icons/SwapHorizontalCircleSharp';
import SwapVerticalCircleSharpIcon from '@material-ui/icons/SwapVerticalCircleSharp';
import WatchLaterSharpIcon from '@material-ui/icons/WatchLaterSharp';
import PhotoLibrarySharpIcon from '@material-ui/icons/PhotoLibrarySharp';
import AspectRatioSharpIcon from '@material-ui/icons/AspectRatioSharp';
import PhotoSizeSelectLargeSharpIcon from '@material-ui/icons/PhotoSizeSelectLargeSharp';
import DynamicFeedSharpIcon from '@material-ui/icons/DynamicFeedSharp';
import InputAdornment from '@material-ui/core/InputAdornment';
import CropOutlinedIcon from '@material-ui/icons/CropOutlined';
// import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function ControlPanel(props) {
  const classes = useStyles();
  const {
    cropHeight,
    setCropHeight,
    cropWidth,
    setCropWidth,
    length,
    setLength,
    scale,
    setScale,
  } = props;

  const options = [
    '300x1050',
    '300x250',
    '300x600',
    '320x480',
    '320x50',
    '320x100',
    '468x60',
    '728x90',
    '970x90',
    '970x250',
    '800x250',
    '336x280',
    '180x150',
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CropOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crop Settings
        </Typography>
      </div>
      <form className={classes.form}>
        <TextField
          id="outlined-basic"
          label="Crop Width"
          fullWidth
          margin="normal"
          autoFocus
          variant="outlined"
          name="cropWidth"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SwapHorizontalCircleSharpIcon color="primary" />
              </InputAdornment>
            ),
          }}
          value={cropWidth}
          onChange={(e) => {
            setCropWidth(e.target.value);
            localStorage.setItem('cropWidth', e.target.value);
          }}
        />
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Crop Height"
          fullWidth
          margin="normal"
          variant="outlined"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SwapVerticalCircleSharpIcon color="primary" />
              </InputAdornment>
            ),
          }}
          value={cropHeight}
          onChange={(e) => {
            setCropHeight(e.target.value);
            localStorage.setItem('cropHeight', e.target.value);
          }}
        />

        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Length"
          fullWidth
          margin="normal"
          variant="outlined"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WatchLaterSharpIcon color="primary" />
              </InputAdornment>
            ),
          }}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
            localStorage.setItem('length', e.target.value);
          }}
        />

        <TextField
          className={classes.textField}
          id="outlined-basic"
          fullWidth
          margin="normal"
          label="Scale"
          variant="outlined"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhotoLibrarySharpIcon color="primary" />
              </InputAdornment>
            ),
          }}
          value={scale}
          onChange={(e) => {
            setScale(e.target.value);
            localStorage.setItem('scale', e.target.value);
          }}
        />

        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Select A Size
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="selectASize"
            value={`${cropWidth}x${cropHeight}`}
            onChange={(e) => {
              const a = e.target.value;
              const b = a.split('x');
              setCropWidth(b[0]);
              setCropHeight(b[1]);
              console.log(e.target.value);
              // localStorage.setItem('scale', e.target.value);
            }}
          >
            {options.map((option) => (
              <MenuItem value={`${option}`} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

ControlPanel.propTypes = {
  cropHeight: PropTypes.any,
  setCropHeight: PropTypes.any,
  cropWidth: PropTypes.any,
  setCropWidth: PropTypes.any,
  length: PropTypes.any,
  setLength: PropTypes.any,
  scale: PropTypes.any,
  setScale: PropTypes.any,
};
