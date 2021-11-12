import React from 'react';
import PopupBanner from '../popup-banner';
import { checkACookieExists, retrieveCookieValue, setCookie } from './../../core/services/utils';

const COOKIENAME = 'displayFreeSamplePopup';
const MAXAGECOOKIEINSEC = 345600;
const TIMEBEFOREDISPLAYINMS = 4000;

const PopupBannerFreeSample= () => {
  
  const [displayPopup, setDisplayPopup] = React.useState(false);
  const displayPopupSmooth = async () => {
    if (!checkACookieExists(COOKIENAME) || (checkACookieExists(COOKIENAME) && retrieveCookieValue(COOKIENAME) !== 'false')) {
      await setTimeout(() => { setDisplayPopup(true); }, TIMEBEFOREDISPLAYINMS);
    }
  };
  displayPopupSmooth();

  const handleClose = async () => {
    setDisplayPopup(false);
    setCookie({name: COOKIENAME, value: 'false', maxAge: MAXAGECOOKIEINSEC});
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    console.log('handleClose from the caller');
  };

  return (
      <PopupBanner
        messageText="Get a free sample box now"
        leftPictureUrl="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/hero.jpg?alt=media&token=2c618b41-3bdc-41f4-b86e-75c8a0163064"
        middlePictureUrl="https://firebasestorage.googleapis.com/v0/b/curakit-7e00d.appspot.com/o/lights.png?alt=media&token=7961ab7a-176d-44ee-90fd-d81de03092b8"
        buttonText="Discover"
        buttonColor="#FB6F3C"
        buttonColorHover="#E8511B"
        textColor="#FFFFFF"
        backgroundColor="#a3daf1"
        handleClose={handleClose}
        handleButtonClick={handleButtonClick}
        display={displayPopup === true}
      />
  );
};

export default PopupBannerFreeSample;