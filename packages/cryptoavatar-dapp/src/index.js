const ethUtils = require('ethjs-util');
const eth = require('./eth');
const ipfs = require('./ipfs');
const utils = require('./utils');

async function renderImage() {
  const file = this.files[0];

  const imageViewer = document.getElementById('imageViewer');
  imageViewer.file = file;
  imageViewer.src = await utils.readFileAsDataURL(file);
}

async function uploadImage() {
  const hash = await ipfs.uploadFileToIpfs(imageViewer.file);

  const cryptoAvatar = await eth.createCryptoAvatar();

  console.log('sending');

  const result = await cryptoAvatar.setAvatar(ethUtils.fromAscii(hash));
  console.log(result);
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', renderImage, false);

const upload = document.getElementById('upload');
upload.addEventListener('click', uploadImage, false);
