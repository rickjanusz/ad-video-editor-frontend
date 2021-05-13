import PropTypes from 'prop-types';
import { Avatar, Grid, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import CropOutlinedIcon from '@material-ui/icons/CropOutlined';

import ControlPanel from './ControlPanel';
import useControlPanelStyles from './styles/useControlPanelStyles';

export default function Header(props) {
  const {
    cropWidth,
    setCropWidth,
    cropHeight,
    setCropHeight,
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

  return (
    <Box component="main" maxWidth="xl" className={classes.appBar}>
      <Grid container spacing={0}>
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
        <Grid xs={8} item>
          <ControlPanel
            // props={props}
            cropWidth={cropWidth}
            setCropWidth={setCropWidth}
            cropHeight={cropHeight}
            setCropHeight={setCropHeight}
            length={length}
            setLength={setLength}
            scale={scale}
            setScale={setScale}
            json={json}
            treatmentOverlay={treatmentOverlay}
            setTreatmentOverlay={setTreatmentOverlay}
            setFieldData={setFieldData}
            fieldData={fieldData}
            retina={retina}
            setRetina={setRetina}
          />
        </Grid>
        <Grid xs item>
          <div />
        </Grid>
      </Grid>
    </Box>
  );
}

Header.propTypes = {
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
