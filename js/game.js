{
  // image is new set to a new Image Object
  const image = new Image();
  // Get a reference to the HTML Take Photo Button by selecting the first DOM
  // element with a CLASS of 'takePhoto'. The  ` . ` before the Class Name tells
  // the selector that the name that follows the  ` . `  is a Class.
  const takePhotoButton = document.querySelector('.takePhoto');

  let contraints, imageCapture, mediaStream, video;

  // Puzzle Variables
  let numCol = 3, numRow = 3;
  const puzzlePieces = numCol * numRow;
  const imagePieces = new Array(puzzlePieces);
  const markers = document.querySelectorAll('a-marker');

  // let puzzle = [...Array(puzzlePieces).keys()].map(String);

  /**
 *Get a list of the available media input and output devices, such as microphones, cameras, headsets, and so forth, using the  ` MediaDevices.enumerateDevices() `  function.  This function returns a **JS Promise**. We use the **catch** in case an error causes the operation to **rejects**.  We use a **then** to process the array of media devices if is successfully return.
 */
  const init = () => {
    // From our HTML file, pull the AR.js video which is created within the A-Frame
    // Scene using the embedded arjs properties
    video = document.querySelector('video');

    navigator
      .mediaDevices
      .enmerateDevices()
      .catch(error => console.log('enmerateDevices() error', error))
      .then(getStream);

    takePhotoButton.addEventListener('click', getPicture);
  }

  const getStream = () => {

    // Get a video stream from teh camera
    if (mediaStream) {
      mediaStream
        .getTracks()
        .forEach(track => track.stop())
    }

    constraints = {
      video: {
        width: 720,
        height: 720
      }
    };

    navigator
      .mediaDevices
      .getUserMedia(contraints)
      .catch(error => console.log('getUserMedia error: ', error))
      .then(gotStream);
  }

  /** Display the stream fromthe camera, and then create an ImageCapture object, using video from the stream */
  const gotStream = (stream) => {
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new imageCapture(stream.getVideoTracks()[0])
  }

  // Take the Picture
  const getPicture = () => {
    imageCapture.takePhoto()
      .catch(error => console.log('takePhoto() error: ', error))
      .then((img) => {
        image.src = URL.createObjectURL(img);
        image.addEventListener('load', () => createImagePieces(image));
        setInterval(() => checkDistance(), 1000);
      });
  }

  const createImagePieces = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pieceWidth = image.width / numCol;
    const pieceHeight = image.height / numRow;

    for (let x = 0; x < numCol; x++) {
      for (let y = 0; y < numRow; y++) {
        // 
        ctx.drawImage(
          image, 
          x * pieceWidth, 
          y * pieceHeight,
          pieceWidth,
          pieceHeight,
          0,
          0,
          canvas.width,
          canvas.height);
      }
    }
  };
}
