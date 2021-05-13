import { Box, Typography, Button } from '@material-ui/core';
import React from 'react';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import usePreviewStyles from './styles/usePreviewStyles';

export default function Preview({ crop, gif, jpg, filename, currentAdSize }) {
  const theme = useTheme();
  const classes = usePreviewStyles(theme);

  const DisplayPreview = () => {
    if (!jpg && !gif && !crop) {
      return <></>;
    }
    return (
      <Box className={classes.preview}>
        <Typography
          className={classes.previewHeader}
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
        >
          Preview &amp; Download
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {gif && (
            <span style={{ display: 'inline-block' }}>
              <Box
                boxShadow={17}
                border={15}
                m={1}
                borderColor={theme.palette.background.paper}
                display="flex"
                justifyContent="center"
                className={classes.paper}
              >
                <img src={gif} alt={`cropped_gif_${currentAdSize}`} />
                <Button
                  variant="contained"
                  fullWidth
                  title={`Download ${filename}`}
                  endIcon={<SystemUpdateAltIcon />}
                  download={`${filename}_${currentAdSize}.gif`}
                  href={gif}
                >
                  Download GIF
                </Button>
              </Box>
            </span>
          )}
          {jpg && (
            <span style={{ display: 'inline-block' }}>
              <Box
                boxShadow={2}
                border={15}
                m={1}
                borderColor={theme.palette.background.paper}
                display="flex"
                justifyContent="center"
                className={classes.paper}
              >
                <img src={jpg} alt={`cropped_jpg_${currentAdSize}`} />
                <Button
                  variant="contained"
                  fullWidth
                  title={`Download ${filename}`}
                  endIcon={<SystemUpdateAltIcon />}
                  download={`${filename}_${currentAdSize}.jpg`}
                  href={jpg}
                >
                  Download JPG
                </Button>
              </Box>
            </span>
          )}
          {crop && (
            <span style={{ display: 'inline-block' }}>
              <Box
                boxShadow={24}
                border={15}
                m={1}
                borderColor={theme.palette.background.paper}
                display="flex"
                justifyContent="center"
                className={classes.paper}
              >
                <video src={crop} controls id="playerCrop" muted />

                <Button
                  variant="contained"
                  fullWidth
                  title={`Download ${filename}`}
                  endIcon={<SystemUpdateAltIcon />}
                  download={`${filename}_${currentAdSize}.mp4`}
                  href={crop}
                >
                  Download Mp4
                </Button>
              </Box>
            </span>
          )}
        </Box>
      </Box>
    );
  };
  return <DisplayPreview />;
}

Preview.propTypes = {
  crop: PropTypes.any,
  gif: PropTypes.any,
  jpg: PropTypes.any,
  filename: PropTypes.any,
  currentAdSize: PropTypes.any,
};
