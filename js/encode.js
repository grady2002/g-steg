const secretInput = document.querySelector("#secretInput");
const formFile = document.querySelector("#formFile");
const canvas = document.querySelector("#imageCanvas");
const canvasContext = canvas.getContext("2d");
const textCanvas = document.querySelector("#textCanvas");
const tcanvasContext = textCanvas.getContext("2d");

const encode = (e) => {
  console.log(e);
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      textCanvas.width = img.width;
      textCanvas.height = img.height;
      tcanvasContext.font = "30px Arial";
      const messageText = secretInput.value.length ? secretInput.value : "";
      tcanvasContext.fillText(messageText, 10, 50);
      canvasContext.drawImage(img, 0, 0);
      const imgData = canvasContext.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      const textData = tcanvasContext.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      let pixelsInMsg = 0;
      let pixelsOutMsg = 0;
      for (let i = 0; i < textData.data.length; i += 4) {
        if (textData.data[i + 3] !== 0) {
          if (imgData.data[i + 1] % 10 == 7) {
          } else if (imgData.data[i + 1] > 247) {
            imgData.data[i + 1] = 247;
          } else {
            while (imgData.data[i + 1] % 10 != 7) {
              imgData.data[i + 1]++;
            }
          }
          pixelsInMsg++;
        } else {
          if (imgData.data[i + 1] % 10 == 7) {
            imgData.data[i + 1]--;
          }
          pixelsOutMsg++;
        }
      }
      canvasContext.putImageData(imgData, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.files[0]);
};
