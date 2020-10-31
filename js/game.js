{
  /* Existing Game-Level Variables */
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;

  const init = () => {
    video = document.querySelector('video');

    // new code
    /* returns an array of media devices including camera available to us. If successful, call 'getStream' function if fails, calls error handler */
    navigator.mediaDevices.enumerateDevices()
      .then(getStream)
      .error((error) => console.log('enumerateDevices() error: ', error));

    /* take picture when user presses 'takePhotoButton' by listening for 'click' event and running a function */
    takePhotoButton.addEventListener('click', getPicture);
  }

  /* The 'init' function calls two other functions 'getStream' and 'getPicture' that we will code in the next two lessons */

  window.addEventListener(`load`, () => setTimeout(() => init(), 1000));
}
