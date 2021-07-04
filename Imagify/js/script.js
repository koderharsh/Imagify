let bodyContainer = document.getElementsByClassName("body-container")[0];
let imgElement = document.getElementById("imageSrc");
let inputElement = document.getElementById("fileInput");
let inputContainer = document.getElementsByClassName("input-container")[0];
let outputContainer = document.getElementsByClassName("output-container")[0];
let inputHeight = document.getElementsByClassName("input-height")[0];
let inputWidth = document.getElementsByClassName("input-width")[0];
let caption = document.getElementsByClassName("caption")[0];
let buttonResize = document.getElementsByClassName("button-resize")[0];
let heightInput = document.getElementById("heightInput");
let widthInput = document.getElementById("widthInput");
let buttonDownload = document.getElementsByClassName("button-download")[0];
let leftContainer = document.getElementsByClassName("left-container")[0];
let footer = document.getElementsByClassName("footer")[0];
let canvas = document.getElementById("canvasOutput");
let downloadBtn = document.getElementById("download");
let imageHeight = 0,
  imageWidth = 0,
  inpHeight = 0,
  inpWidth = 0,
  uploaded = false;
function handleSubmit() {
  inpHeight = heightInput.value;
  inpWidth = widthInput.value;
  let count = 0;
  for (let i = 0; i < imgElement.src.length; i++) {
    if (imgElement.src[i] === "/") count++;
  }
  if (count === 3 && Number(inpHeight) !== 0 && Number(inpWidth) !== 0) {
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    let dsize = new cv.Size(Number(inpWidth), Number(inpHeight));
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow("canvasOutput", dst);
    src.delete();
    dst.delete();
    heightInput.value = "";
    widthInput.value = "";
    outputContainer.style.height = `${Number(inpHeight)}px`;
    outputContainer.style.width = `${Number(inpWidth)}px`;
    inputHeight.style.top = `calc(${imageHeight}px + ${Number(
      inpHeight
    )}px + 15vh)`;
    inputWidth.style.top = `calc(${imageHeight}px + ${Number(
      inpHeight
    )}px + 20vh)`;
    buttonResize.style.top = `calc(${imageHeight}px + ${Number(
      inpHeight
    )}px + 25vh)`;
    buttonDownload.style.top = `calc(${imageHeight}px + ${Number(
      inpHeight
    )}px + 32vh)`;
    bodyContainer.style.height = `calc(${imageHeight}px + ${Number(
      inpHeight
    )}px + 75vh)`;
    leftContainer.style.height = `calc(${imageHeight}px + ${Number(
      inpHeight
    )}px + 42vh)`;
    footer.style.top = `calc(${imageHeight}px + ${Number(inpHeight)}px + 58vh)`;
  } else {
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    let dsize = new cv.Size(300, 300);
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow("canvasOutput", dst);
    src.delete();
    dst.delete();
    heightInput.value = "";
    widthInput.value = "";
    outputContainer.style.height = `40vh`;
    outputContainer.style.width = `40vh`;
    inputHeight.style.top = `calc(${imageHeight}px + 40vh + 15vh)`;
    inputWidth.style.top = `calc(${imageHeight}px + 40vh + 20vh)`;
    buttonResize.style.top = `calc(${imageHeight}px + 40vh + 25vh)`;
    buttonDownload.style.top = `calc(${imageHeight}px + 40vh + 32vh)`;
    bodyContainer.style.height = `calc(${imageHeight}px + 40vh + 75vh)`;
    leftContainer.style.height = `calc(${imageHeight}px + 40vh + 42vh)`;
    footer.style.top = `calc(${imageHeight}px + 40vh + 58vh)`;
  }
}

inputElement.addEventListener(
  "change",
  (e) => {
    uploaded = false;
    downloadBtn.style.pointerEvents = "none";
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    imgElement.onload = function () {
      handleSubmit();
      uploaded = true;
      imageHeight = this.height;
      imageWidth = this.width;
      inputContainer.style.height = `${imageHeight}px`;
      inputContainer.style.width = `${imageWidth}px`;
      caption.style.top = `calc(${imageHeight}px + 5vh)`;
      outputContainer.style.top = `calc(${imageHeight}px + 10vh)`;
      inputHeight.style.top = `calc(${imageHeight}px + 40vh + 15vh)`;
      inputWidth.style.top = `calc(${imageHeight}px + 40vh + 20vh)`;
      buttonResize.style.top = `calc(${imageHeight}px + 40vh + 25vh)`;
      buttonResize.style.pointerEvents = "auto";
      buttonDownload.style.top = `calc(${imageHeight}px + 40vh + 32vh)`;
      bodyContainer.style.height = `calc(${imageHeight}px + 40vh + 75vh)`;
      leftContainer.style.height = `calc(${imageHeight}px + 40vh + 42vh)`;
      footer.style.top = `calc(${imageHeight}px + 98vh)`;
      downloadBtn.style.pointerEvents = "auto";
    };
  },
  false
);
