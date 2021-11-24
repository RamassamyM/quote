import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PopupBanner from '../popup-banner';
import { checkACookieExists, retrieveCookieValue, setCookie } from './../../core/services/utils';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVideoModalDisplay, selectDisplayVideo } from './freeSampleSlice';
import ReactPlayer from 'react-player/lazy';

const COOKIENAME = 'displayFreeSamplePopup';
const MAXAGECOOKIEINSEC = 86400;
const TIMEBEFOREDISPLAYINMS = 4000;

const PopupBannerFreeSample= () => {
  const dispatch = useDispatch();
  const displayVideoFromStore = useSelector(selectDisplayVideo);
  console.log('displayVideo: ', displayVideoFromStore);
  const [displayPopup, setDisplayPopup] = React.useState(false);
  const displayPopupSmooth = async () => {
    if (!checkACookieExists(COOKIENAME) || (checkACookieExists(COOKIENAME) && retrieveCookieValue(COOKIENAME) !== 'false')) {
      await setTimeout(() => { setDisplayPopup(true); }, TIMEBEFOREDISPLAYINMS);
    }
  };
  displayPopupSmooth();

  const handleClose = async () => {
    await setCookie({name: COOKIENAME, value: 'false', maxAge: MAXAGECOOKIEINSEC});
    setDisplayPopup(false);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    console.log('handle button learnmore click from the caller');
    dispatch(toggleVideoModalDisplay());
  };
  
  const handleCloseFreeSampleVideoModal = (event) => {
    event.preventDefault();
    console.log('handle button close click in modal');
    dispatch(toggleVideoModalDisplay());
  };

  const freeSampleVideoModalRef = React.useRef(null);

  return (
    <React.Fragment>
      <PopupBanner
        messageText="Get a free sample box"
        leftPictureUrl="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/hero.jpg?alt=media&token=2c618b41-3bdc-41f4-b86e-75c8a0163064"
        middlePictureUrl="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/lights.png?alt=media&token=7961ab7a-176d-44ee-90fd-d81de03092b8"
        buttonText="Discover"
        buttonColor="#FB6F3C"
        buttonColorHover="#E8511B"
        textColor="#FFFFFF"
        backgroundColor="#a3daf1"
        handleClose={handleClose}
        handleButtonClick={handleButtonClick}
        display={displayPopup}
      />
      <React.Fragment>
          <Dialog
            name='Free Sample video tutorial'
            open={displayVideoFromStore}
            onClose={handleCloseFreeSampleVideoModal}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            ref={freeSampleVideoModalRef}
            fullWidth
          >
            <DialogTitle id="scroll-dialog-title">How to get your free sample box ?</DialogTitle>
            <DialogContent>
              <Box mb={4}>
                <ReactPlayer 
                  url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
                  controls={true}
                  light={'https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/video_tutorial_placeholder.png?alt=media&token=cb75130f-3998-40dd-b418-64460b2e3258'}
                  width={'100%'}
                  height={'220px'}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button name='Close' onClick={handleCloseFreeSampleVideoModal} color="default">
                close
              </Button>
            </DialogActions>
          </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
};

export default PopupBannerFreeSample;