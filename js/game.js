{
  /* Existing Game-Level Variables */
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;

  // 09 | Add Game-Level Variables
  let mediaStream;

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

  // 09 | new code
  
  const getStream = () => {
    
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    
    const constraints = {
      video: {
        height: 720,
        width: 720,
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .error((error) => console.log('getUserMedia() error: ', error));
  };
  
  // 09 | new code

  const gotStream = (stream) => {
    
  };
}