{
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;
  let mediaStream;
  let imageCapture;
  // f10 - New Variable
  const image = new Image();

  const init = () => {
    video = document.querySelector('video');
    navigator.mediaDevices.enumerateDevices()
      .then(getStream)
      .error((error) => console.log('enumerateDevices() error: ', error));
    takePhotoButton.addEventListener('click', getPicture);
  }
    
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

  const gotStream = (stream) => {
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  };

  // f10 - New Code
  const getPicture = () => {
    imageCapture.takePhoto()
      .catch((error) => console.log('takePhoto() error: ', error))
      .then((img) => {
        image.src = URL.createObjectURL(img);
        // f11 - New Code
        image.addEventListener('load', () => createImagePieces(img));
        // f12 - New Code
        setInterval(() => checkDistance(), 1000);
      });
  };
  
  window.addEventListener('load', () => setTimeout(() => init(), 1000));
}
