{
  /* Existing Game-Level Variables */
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;

  // 09 | Add Game-Level Variables
  let mediaStream;

  const init = () => {
    video = document.querySelector('video');
    navigator.mediaDevices.enumerateDevices()
      .then(getStream)
      .error((error) => console.log('enumerateDevices() error: ', error));
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

  window.addEventListener(`load`, () => setTimeout(() => init(), 1000));
}
