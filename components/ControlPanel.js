import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import CropOutlinedIcon from '@material-ui/icons/CropOutlined';
// import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    theme,
  } = props;

  //   console.log(theme);

  const useStyles = makeStyles(() => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    <Container component="main" maxWidth="xs">
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
          id="standard"
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
        <TextField
          id="standard"
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

        <TextField
          id="standard"
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

        <TextField
          id="standard"
          margin="normal"
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

        <FormControl fullWidth margin="normal" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Select A Size
          </InputLabel>
          <Select
            labelId="standard"
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
  theme: PropTypes.any,
};
