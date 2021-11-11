import React from 'react';
import PopupBanner from '../popup-banner';

const PopupBannerFreeSample= () => {
  const [displayPopup, setDisplayPopup] = React.useState('block');

  const handleClose = () => {
    setDisplayPopup('none');
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
        buttonText="Learn more"
        buttonColor="#FB6F3C"
        buttonColorHover="#E8511B"
        textColor="#FFFFFF"
        backgroundColor="#a3daf1"
        handleClose={handleClose}
        handleButtonClick={handleButtonClick}
        display={displayPopup}
      />
  );
};

export default PopupBannerFreeSample;