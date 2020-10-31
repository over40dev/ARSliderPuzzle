{
  // f08

  /* Create Game-Level Variables */

  // get reference to DOM HTML Button with Class of 'takePhoto'
  const takePhotoButton = document.querySelector('.takePhoto');

  /* Create 'init' Function | runs when page loads */

  const init = () => {
    // get access to 'video element' which is added by 'AR.js' when it processes page.
    video = document.querySelector('video');
    // returns an array of media devices including camera available to us
    // if successful, call 'getStream' function
    // if fails, calls error handler
    navigator.mediaDevices.enumerateDevices()
      .then(getStream)
      .error((error) => console.log('enumerateDevices() error: ', error));

    /* take picture when user clicks 'takePhotoButton' by listening for 'click' event and running a function*/
    takePhotoButton.addEventListener('click', getPicture);
  }

  /* The 'init' function calls two other functions 'getStream' and 'getPicture' that we will code in the next two lessons */

  window.addEventListener(`load`, () => setTimeout(() => init(), 1000));
}