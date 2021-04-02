const MediaRender = (props) => {

  const Crop = () => {
    if (crop) {
      return (
        <span style={{ display: 'inline-block' }}>
          <Box
            boxShadow={7}
            border={15}
            borderColor={theme.palette.background.paper}
            display="flex"
            justifyContent="center"
            className={classes.paper}
          >
            <video
              className="preview mp4"
              controls
              id="playerCrop"
              muted
              src={crop}
            />
            <Button
              variant="contained"
              fullWidth
              title={`Download ${filename}`}
              endIcon={<SystemUpdateAltIcon />}
              download={`${filename}_${cropWidth}x${cropHeight}.mp4`}
              href={crop}
            >
              Download MP4
            </Button>
          </Box>
        </span>
      );
    }
    return <></>;
  };


  const { [gif, jpg, video] } = props;
  if (jpg || gif || video) {
    return (
      <span style={{ display: 'inline-block' }}>
        <Box
          boxShadow={3}
          border={15}
          borderColor={theme.palette.background.paper}
          display="flex"
          justifyContent="center"
          className={classes.paper}
          m={2}
        >
          <img className="preview jpg" src={jpg} alt="" />
          <Button
            variant="contained"
            fullWidth
            title={`Download ${filename}`}
            endIcon={<SystemUpdateAltIcon />}
            download={`${filename}_${cropWidth}x${cropHeight}.jpg`}
            href={jpg}
          >
            Download Jpg
          </Button>
        </Box>
      </span>
    );
  }
  return <></>;
};

export default MediaRender;


const PreviewStage = () => {
  if (gif || jpg || crop) {
    return (
      <Container className={classes.preview} maxWidth="xl">
        <Typography
          className={classes.previewHeader}
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
        >
          Preview &amp; Export
        </Typography>
        <Box style={{ textAlign: 'center' }}>
          
        </Box>
      </Container>
    );
  }
  return <></>;
};
