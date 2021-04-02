import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TuneIcon from '@material-ui/icons/Tune';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import Alert from '@material-ui/lab/Alert';

const GetStarted = ({ theme }) => {
  // console.log('Theme', theme);
  const useStyles = makeStyles(() => ({
    root: {},
    clip: {
      // backgroundColor: theme.palette.secondary.light,
      opacity: '.6',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: '0',
      width: '100%',
      height: '100%',
      clipPath: 'polygon(0 0, 70% 0%, 100% 100%, 30% 100%)',
    },
    clip2: {
      // backgroundColor: theme.palette.secondary.light,
      opacity: '1',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      left: '0',
      left: 1020,
      width: '100%',
      height: '100%',
      clipPath: 'polygon(0 0, 70% 0%, 100% 100%, 30% 100%)',
    },
    wrapper: {
      position: 'relative',
      // padding: theme.spacing(8),
      overflow: 'hidden',
    },
    card: {
      margin: '0 10px',
    },
  }));

  const classes = useStyles();
  return (
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
            <Typography variant="body2" color="textSecondary" component="p">
              Click on <br />
              <Button
                className={classes.upload}
                startIcon={<CloudUploadIcon />}
              >
                Upload Video
              </Button>
              in the upper right corner then drag and drop your media onto the
              dropzone. Videos must be under 5mb
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="400"
            image="/static/images/configure.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Configure Your Crop &amp; Length
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Use the inputs at the top of the page to scale your crop area.
              Once you're satisfied, start exporting!
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="400"
            image="/static/images/download.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Export Video, Gif &amp; Poster Images
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Export video, gif or jpgs by simply pressing the desired export
              buttons. Exporting to GIF is a great preview for the video, and it
              will loop! How easy is that?
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
export default GetStarted;
