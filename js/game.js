{
  // f08
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;
  // f09
  let mediaStream;
  let imageCapture;
  // f10
  const image = new Image();
  // f11
  let numCol = 3, numRow = 3;
  // f12 - New Variables
  let puzzlePieces = numCol * numRow;
  let imagePieces = new Array(puzzlePieces);
  let puzzle = [...imagePieces.keys()].map(String);
  let markers = document.querySelectorAll('a-marker');
  // f14
  // let positionMarkers = [];
  // let check = new Array(6);

  // f08
  const init = () => {
    video = document.querySelector('video');
    navigator.mediaDevices.enumerateDevices()
      .then(getStream)
      .error((error) => console.log('enumerateDevices() error: ', error));
    takePhotoButton.addEventListener('click', getPicture);
  }
    
  // f09
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

  // f09
  const gotStream = (stream) => {
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  };

  // f10
  const getPicture = () => {
    imageCapture.takePhoto()
      .catch((error) => console.log('takePhoto() error: ', error))
      .then((img) => {
        image.src = URL.createObjectURL(img);
        // f11
        image.addEventListener('load', () => createImagePieces(img));
        // console log during testing - remove from final code
        console.log('puzzle', puzzle);
        // f12 - New Code
        // setInterval(() => checkDistance(), 1000);
      });
  };

  // f11
  const createImagePieces = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pieceWidth = image.width / numCol;
    const pieceHeight = image.height / numRow;

    for (let x = 0; x < numCol; x++) {
      for (let y = 0; y < numRow; y++) {
        ctx.drawImage(image, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
        // f12 - new code
        imagePieces[x * numCol + y] = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        // console log during testing - remove from final code
        console.log(imagePieces);
      }
    }

    markers.forEach((marker, index) => {
      const aImg = new document.createElement('a-image');

      aImg.setAttribute('rotation', '-90, 0, 0');
      aImg.setAttribute('position', '0, 0, 0');
      aImg.setAttribute('src', imagePieces[puzzle[index]]);
      console.log('marker (puzzle): ', index, puzzle[index], imagePieces[puzzle[index]]);
      console.log('marker (without puzzle): ', index, puzzle[index], imagePieces[index]);
      marker.appendChild(aImg);
    });
  }

  // f08
  window.addEventListener('load', () => setTimeout(() => init(), 1000));
}
