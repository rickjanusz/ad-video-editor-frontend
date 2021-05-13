import PropTypes from 'prop-types';
import {
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
} from '@material-ui/core/';
import React, { useState } from 'react';
import { set } from 'nprogress';
import useControlPanelStyles from './styles/useControlPanelStyles';
import { getFieldData } from '../utils/processData';
import { getFieldsForSize } from '../utils/getFieldsForSize';
import TreatmentGhost from './TreatmentGhost';

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
    treatmentOverlay,
    setTreatmentOverlay,
    setFieldData,
    fieldData,
    retina,
    setRetina,
  } = props;

  const theme = useTheme();
  const classes = useControlPanelStyles(theme);

  let options = [];
  if (json) {
    const adData = getFieldData(json[0]);
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
  const [size, setSize] = useState('300x250');

  function handleSelectChange(e) {
    function hasWhiteSpace(s) {
      return s.indexOf(' ') >= 0;
    }
    const a = e.target.value;

    const b = a.split('x');
    if (hasWhiteSpace(a)) {
      // Lifestyle crop
      const c = b[1].split(' ');
      setCropWidth(b[0] * retina);
      setCropHeight(c[0] * retina);

      // use regex to get the original ad size which is in parens of the select
      // we are displaying the "lifestyle crop wxh (ad size wxh)"
      // so we have to get it out of the parens
      const regExp = /\(([^)]+)\)/;
      const adSizeToMatch = regExp.exec(a);
      // get adSize from select when its treatment data
      // use this as the match for which fieldData to get
      setFieldData(getFieldsForSize(json[0], adSizeToMatch[1]));
    } else {
      // Full frame crop
      setCropWidth(b[0] * retina);
      setCropHeight(b[1] * retina);
      //  console.log(`${b[0]}x${b[1]}`);
    }
    setSize(e.target.value);
  }

  const handleShrink = (event) => {
    setTreatmentOverlay(event.target.checked);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const [checked, setChecked] = useState(true);

  function handleChecked(event) {
    setChecked(event.target.checked);
    return <TreatmentGhost fieldData={fieldData} />;
  }

  const [isRetina, setIsRetina] = useState(false);

  function handleRetina(event) {
    setIsRetina(event.target.checked);
    if (isRetina) {
      setRetina(1);
      console.log(retina);
    } else {
      setRetina(2);
      console.log('2', retina);
    }
  }

  return (
    <form className={classes.form}>
      <Grid container spacing={3}>
        <Grid xs item>
          <TextField
            id="standard-number"
            margin="normal"
            label="Crop Width"
            name="cropWidth"
            fullWidth
            error={cropWidth <= 40}
            helperText="Min. Value: 40"
            autoComplete="off"
            type="number"
            value={cropWidth}
            onChange={(e) => {
              setCropWidth(e.target.value);
              localStorage.setItem('cropWidth', e.target.value * retina);
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
            helperText="Min. Value: 40"
            autoComplete="off"
            value={cropHeight}
            onChange={(e) => {
              setCropHeight(e.target.value);
              localStorage.setItem('cropHeight', e.target.value * retina);
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
            helperText="Min. Value: 1"
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
            helperText="Min. Value: .1"
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
                handleSelectChange(e);
                // localStorage.setItem('scale', e.target.value);
              }}
              value={size}
            >
              {options.map((option) => (
                <MenuItem value={`${option}`} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {json && (
          <Grid xs item>
            <FormControlLabel
              control={
                <Switch
                  checked={treatmentOverlay}
                  onChange={handleShrink}
                  name="treatmentOverlay"
                  color="primary"
                />
              }
              label="Show Treatment Overlay"
            />
          </Grid>
        )}

        <Grid xs item>
          <FormControlLabel
            control={
              <Switch
                checked={isRetina}
                onChange={handleRetina}
                name="isRetina"
                color="primary"
              />
            }
            label="Retina Sizing"
          />
        </Grid>
      </Grid>
    </form>
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
  treatmentOverlay: PropTypes.any,
  setTreatmentOverlay: PropTypes.any,
  setFieldData: PropTypes.any,
  fieldData: PropTypes.any,
};
