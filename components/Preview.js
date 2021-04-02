import { Box, makeStyles, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import PropTypes from 'prop-types';

export default function Preview(props) {
  const { crop, gif, jpg, filename, cropHeight, cropWidth, theme } = props;
  const useStyles = makeStyles(() => ({
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

  const classes = useStyles();

  return (
    <Box className={classes.preview}>
      <Typography
        className={classes.previewHeader}
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
      >
        Preview &amp; Export
      </Typography>
      <Box display="flex" justifyContent="center">
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
              <img src={gif} alt={`cropped_gif_${cropWidth}x${cropHeight}`} />
              <Button
                variant="contained"
                fullWidth
                title={`Download ${filename}`}
                endIcon={<SystemUpdateAltIcon />}
                download={`${filename}_${cropWidth}x${cropHeight}.gif`}
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
              <img src={jpg} alt={`cropped_jpg_${cropWidth}x${cropHeight}`} />
              <Button
                variant="contained"
                fullWidth
                title={`Download ${filename}`}
                endIcon={<SystemUpdateAltIcon />}
                download={`${filename}_${cropWidth}x${cropHeight}.jpg`}
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
                download={`${filename}_${cropWidth}x${cropHeight}.${gif}`}
                href={gif}
              >
                Download GIF
              </Button>
            </Box>
          </span>
        )}
      </Box>
    </Box>
  );
}

Preview.propTypes = {
  theme: PropTypes.any,
  filename: PropTypes.any,
  cropWidth: PropTypes.any,
  cropHeight: PropTypes.any,
  crop: PropTypes.any,
  gif: PropTypes.any,
  jpg: PropTypes.any,
};
