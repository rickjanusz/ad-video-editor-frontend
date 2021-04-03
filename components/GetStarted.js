import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const GetStarted = ({ video }) => {
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    root: {},
    clip: {
      backgroundColor: theme.palette.secondary.light,
      opacity: '1',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: '0',
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(0 0, 0% 30%,100% 0%, 30% 100%)',
    },
    clip2: {
      backgroundColor: theme.palette.secondary.dark,
      opacity: '.3',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: 10,
      width: '2000px',
      height: '2000px',
      clipPath: 'polygon(0 0, 0% 100%,100% 100%, 0% 30%)',
    },
    wrapper: {
      position: 'relative',
      // padding: theme.spacing(8),
      overflow: 'hidden',
    },
    card: {
      margin: '0 10px',
      minWidth: '400px',
    },
  }));

  const classes = useStyles();

  const DisplayGetStarted = () => {
    if (!video) {
      return (
        <Box className={classes.wrapper}>
          <Box className={classes.clip} />
          <Box className={classes.clip2} />
          <Box m={1} p={20}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Getting Started
            </Typography>
            <Box display="flex" justifyContent="center">
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Upload"
                    height="400"
                    image="/static/images/upload.jpg"
                    title="Upload"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Upload Your Video
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Click on <CloudUploadIcon /> Upload Video in the upper
                      right corner then drag and drop your media onto the
                      dropzone. Videos must be under 5mb
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Configure"
                    height="400"
                    image="/static/images/configure.jpg"
                    title="Configure"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Configure Your Crop &amp; Length
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Use the inputs at the top of the page to scale your crop
                      area. Once you're satisfied, start exporting!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Download"
                    height="400"
                    image="/static/images/download.jpg"
                    title="Download"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Export Video, Gif &amp; Poster Images
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Export video, gif or jpgs by simply pressing the desired
                      export buttons. Exporting to GIF is a great preview for
                      the video, and it will loop! How easy is that?
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Box>
        </Box>
      );
    }
    return <></>;
  };

  return <DisplayGetStarted />;
};
export default GetStarted;

GetStarted.propTypes = {
  video: PropTypes.any,
};
