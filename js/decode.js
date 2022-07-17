const formFile = document.querySelector("#formFile");
const canvas = document.querySelector("#imageCanvas");
const canvasContext = canvas.getContext("2d");

const decode = (e) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    console.log("reader loaded");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      canvasContext.drawImage(img, 0, 0);
      const decodeData = canvasContext.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      for (let i = 0; i < decodeData.data.length; i += 4) {
        if (decodeData.data[i + 1] % 10 == 7) {
          decodeData.data[i] = 0;
          decodeData.data[i + 1] = 0;
          decodeData.data[i + 2] = 0;
          decodeData.data[i + 3] = 255;
        } else {
          decodeData.data[i + 3] = 0;
        }
      }
      canvasContext.putImageData(decodeData, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.files[0]);
};
