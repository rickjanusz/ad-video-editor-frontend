import { Box, Button, makeStyles } from '@material-ui/core';

import PropTypes from 'prop-types';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const CropPreview = (props) => {
  const { type, fileUrl, theme, filename, cropWidth, cropHeight } = props;

  const useStyles = makeStyles(() => ({
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const classes = useStyles();

  const AddMediaToStage = (deployProps) => {
    const { ft } = deployProps;
    if (ft === 'mp4') {
      return <video controls id="playerCrop" muted src={fileUrl} />;
    }
    return <img src={fileUrl} alt="" />;
  };

  return (
    <span style={{ display: 'inline-block' }}>
      <Box
        boxShadow={getRandomInt(26)}
        border={15}
        m={1}
        borderColor={theme.palette.background.paper}
        display="flex"
        justifyContent="center"
        className={classes.paper}
      >
        <AddMediaToStage ft={type} />
        <Button
          variant="contained"
          fullWidth
          title={`Download ${filename}`}
          endIcon={<SystemUpdateAltIcon />}
          download={`${filename}_${cropWidth}x${cropHeight}.${type}`}
          href={fileUrl}
        >
          Download {type}
        </Button>
      </Box>
    </span>
  );
};
export default CropPreview;

CropPreview.propTypes = {
  type: PropTypes.any,
  fileUrl: PropTypes.any,
  theme: PropTypes.any,
  filename: PropTypes.any,
  cropWidth: PropTypes.any,
  cropHeight: PropTypes.any,
};
