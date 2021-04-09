import PropTypes from 'prop-types';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Box,
  useStyles,
  useTheme,
} from '@material-ui/core/';
import CropOutlinedIcon from '@material-ui/icons/CropOutlined';
import React, { useState } from 'react';
import { getFieldData } from '../utils/processData';
import useControlPanelStyles from './styles/useControlPanelStyles';

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
    json,
  } = props;

  const theme = useTheme();
  const classes = useControlPanelStyles(theme);

  let options = [];
  if (json) {
    console.log(getFieldData(json[0]));
    const adData = getFieldData(json[0]);
    // console.clear();
    // console.log(d.);
    adData.forEach((res) => {
      if (res.ad.lifestyle.dims !== undefined) {
        const w = res.ad.lifestyle.dims?.width;
        const h = res.ad.lifestyle.dims?.height;
        options.push(`${w}x${h} (${res.ad.size})`);
      }
    });
  } else {
    options = [
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
  }

  const [size, setSize] = useState();

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
              error={cropWidth <= 40}
              helperText="Minimum value: 40"
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
              error={cropHeight <= 40}
              helperText="Minimum value: 40"
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
              error={length < 1}
              helperText="Minimum value: 1"
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
              error={scale < 0.1}
              helperText="Minimum value: .1"
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
                onChange={(e) => {
                  function hasWhiteSpace(s) {
                    return s.indexOf(' ') >= 0;
                  }
                  const a = e.target.value;
                  const b = a.split('x');
                  if (hasWhiteSpace(a)) {
                    const c = b[1].split(' ');
                    setCropWidth(b[0]);
                    setCropHeight(c[0]);
                  } else {
                    setCropWidth(b[0]);
                    setCropHeight(b[1]);
                  }
                  setSize(e.target.value);
                  // console.log(e.target.value);
                  // localStorage.setItem('scale', e.target.value);
                }}
                value={size}
              >
                {options.map((option) => (
                  // console.log(option);
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
  json: PropTypes.any,
};
