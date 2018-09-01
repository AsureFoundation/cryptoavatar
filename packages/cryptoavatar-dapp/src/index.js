const ethUtils = require('ethjs-util');
const eth = require('./eth');
const ipfs = require('./ipfs');
const utils = require('./utils');

const fileInput = document.getElementById('fileInput');
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

fileInput.addEventListener('change', renderImage, false);
upload.addEventListener('click', uploadImage, false);
document.addEventListener('DOMContentLoaded', loadImage, false);
