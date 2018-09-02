const ethUtils = require('ethjs-util');
const Cropper = require('cropperjs').default;
const eth = require('./eth');
const ipfs = require('./ipfs');
const utils = require('./utils');

const upload = document.getElementById('upload');
const imageViewer = document.getElementById('imageViewer');

async function loadImage() {
  console.log('loading image');
  const cryptoAvatar = await eth.createCryptoAvatar();
  const account = await eth.getAccount();
  const result = await cryptoAvatar.getAvatar(account);
  if (result._ipfsHash != '0x') {
    const hash = ethUtils.toAscii(result._ipfsHash);
    console.log('found image', hash);
    imageViewer.src = `https://gateway.ipfs.io/ipfs/${hash}`;
  } else {
    console.log('found no image', result);
  }
}

async function renderImage() {
  const file = this.files[0];

  if (imageViewer.cropper) {
    imageViewer.cropper.destroy();
  }

  imageViewer.file = file;
  imageViewer.src = await utils.readFileAsDataURL(file);

  imageViewer.cropper = new Cropper(imageViewer, {
    viewMode: 1,
    dragMode: 'move',
    aspectRatio: 1,
    minCropBoxWidth: 460,
    minCropBoxHeight: 460,
    autoCropArea: 0.65,
    restore: false,
    guides: false,
    center: false,
    highlight: false,
    cropBoxMoveable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false
  });
}

async function uploadImage() {
  if (!imageViewer.cropper) {
    return false;
  }

  const croppedFile = await utils.canvasToBlob(
    imageViewer.cropper.getCroppedCanvas()
  );

  const hash = await ipfs.uploadFileToIpfs(croppedFile);
  const cryptoAvatar = await eth.createCryptoAvatar();

  console.log('sending');
  const result = await cryptoAvatar.setAvatar(ethUtils.fromAscii(hash));
  console.log(result);
  return true;
}

fileInput.addEventListener('change', renderImage, false);
upload.addEventListener('click', uploadImage, false);
document.addEventListener('DOMContentLoaded', loadImage, false);
