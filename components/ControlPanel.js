import PropTypes from 'prop-types';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Divider,
  Box,
  makeStyles,
  useTheme,
} from '@material-ui/core/';
import CropOutlinedIcon from '@material-ui/icons/CropOutlined';

export default function ControlPanel(props) {
  //   console.log(props.theme);
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

  const theme = useTheme();
  const useStyles = makeStyles(() => ({
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
      height: 70,
      width: 70,
      transform: 'rotate(90deg)',
    },
    appBar: {
      background: theme.palette.secondary.mainGradient,
      // backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(0),
      marginBottom: theme.spacing(0),
      position: 'fixed',
      zIndex: 3,
      width: '100vw',
    },
    headerIcon: {
      width: 32,
      height: 32,
    },
  }));

  const classes = useStyles();

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
    <Box component="main" maxWidth="xl" className={classes.appBar}>
      <form className={classes.form}>
        <Grid container spacing={3}>
          <Grid xs item>
            <div />
          </Grid>

          <Grid xs item>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <CropOutlinedIcon className={classes.headerIcon} />
              </Avatar>
            </div>
          </Grid>
          <Grid xs item>
            <TextField
              id="standard-number"
              margin="normal"
              label="Crop Width"
              name="cropWidth"
              fullWidth
              autoComplete="off"
              type="number"
              value={cropWidth}
              onChange={(e) => {
                setCropWidth(e.target.value);
                localStorage.setItem('cropWidth', e.target.value);
              }}
            />
          </Grid>
          <Grid xs item>
            <TextField
              id="standard-number"
              margin="normal"
              label="Crop Height"
              name="cropHeight"
              fullWidth
              type="number"
              autoComplete="off"
              value={cropHeight}
              onChange={(e) => {
                setCropHeight(e.target.value);
                localStorage.setItem('cropHeight', e.target.value);
              }}
            />
          </Grid>

          <Grid xs item>
            <TextField
              id="standard-number"
              margin="normal"
              label="Clip Length"
              name="length"
              fullWidth
              type="number"
              autoComplete="off"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
                localStorage.setItem('length', e.target.value);
              }}
            />
          </Grid>
          <Grid xs item>
            <TextField
              id="standard-number"
              margin="normal"
              step=".1"
              label="Scale"
              fullWidth
              type="number"
              autoComplete="off"
              value={scale}
              onChange={(e) => {
                setScale(e.target.value);
                localStorage.setItem('scale', e.target.value);
              }}
            />
          </Grid>
          <Grid xs item>
            <FormControl
              fullWidth
              margin="normal"
              className={classes.formControl}
            >
              <InputLabel id="standard">Select A Size</InputLabel>
              <Select
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
          </Grid>

          <Grid xs item>
            <div />
          </Grid>
        </Grid>
      </form>
      <Divider />
    </Box>
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
