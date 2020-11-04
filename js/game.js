{
  // f08
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;
  // f09
  let mediaStream;
  let imageCapture;
  // f10
  let image = new Image();
  // f11
  let numCol = 3, numRow = 3;
  // f12
  let puzzlePieces = numCol * numRow;
  let imagePieces = new Array(puzzlePieces);
  let puzzle = [...imagePieces.keys()].map(String);
  let markers = document.querySelectorAll('a-marker');
  // f13
  /* no new vars */
  // f14 - New Vars
  let positionMarkers = [];
  let tolerance = 1.9;
  // f15
  // let check = new Array(6);

  // f08
  const init = () => {
    video = document.querySelector('video');
    navigator.mediaDevices.enumerateDevices()
      .catch(error => console.log('enumerateDevices() error', error))
      .then(getStream);
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
        width: 720
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(gotStream)
      .catch((error) => {
        console.log('getUserMedia() error: ', error);
      });
  };

  // f09
  const gotStream = (stream) => {
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  };
  
  // f10
  const getPicture = () => {
    // f13
    shuffle(puzzle);
    imageCapture.takePhoto()
      .catch((error) => console.log('takePhoto() error: ', error))
      .then((img) => {
        image.src = URL.createObjectURL(img);
        // f11
        image.addEventListener('load', () => createImagePieces(image));
        // f14
        setInterval(() => checkDistance(), 1000);
        // f12
        // console log during testing - remove from final code
        console.log('puzzle', puzzle);
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
        // f12
        imagePieces[8 - pieces] = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(imagePieces);
        pieces = pieces - 3;
        if (pieces < 0) {
          pieces = (puzzlePieces - 1) + pieces;
        }
      }
    }

    markers.forEach((marker, index) => {
      const aImg = new document.createElement('a-image');

      aImg.setAttribute('rotation', '-90, 0, 0');
      aImg.setAttribute('position', '0, 0, 0');
      aImg.setAttribute('src', imagePieces[puzzle[index]]);
      marker.appendChild(aImg);
    });
  }

  // f13
  const shuffle = (randomArray) => {
    for (let i = randomArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    return randomArray;
  }

  // f14 - New Code
  const checkDistance = () => {
    // f14 - step 1
    for (let i = 0; i < markers.length; i++) {
      positionMarkers[i] = markers[i].object3D;
    }
    // f14 - step 2
    if ((positionMarkers[puzzle[0]].position.x - positionMarkers[puzzle[8]].position.x) !== 0) {
      /* positions are available */
      // f14 - step 3
      for (let i = 0; i < numRow; i++) {
        if (
          Math.abs(positionMarkers[puzzle[0 + (3 * i)]].position.x 
          - positionMarkers[puzzle[1 + (3 * i)]].position.x) < tolerance && 
          Math.abs(positionMarkers[puzzle[1 + (3 * i)]].position.x - positionMarkers[puzzle[2 + (3 * i)]].position.x) < tolerance && 
          Math.abs(positionMarkers[puzzle[0 + (3 * i)]].rotation.x - positionMarkers[puzzle[1 + (3 * i)]].rotation.x) < tolerance && 
          Math.abs(positionMarkers[puzzle[1 + (3 * i)]].rotation.x - positionMarkers[puzzle[2 + (3 * i)]].rotation.x) < tolerance) {
        }
      }
    }
  }
  

  // f08
  window.addEventListener('load', () => setTimeout(() => init(), 5000));
}
