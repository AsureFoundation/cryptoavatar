const Eth = require('ethjs');
const utils = require('./utils');
const ipfs = require('./ipfs');

const eth = new Eth(window.web3.currentProvider);

eth.getBlockByNumber('latest', true, (err, block) => {
  console.log(err, block);
});

async function renderImage() {
  const file = this.files[0];

  const imageViewer = document.getElementById('imageViewer');
  imageViewer.file = file;
  imageViewer.src = await utils.readFileAsDataURL(file);
}

async function uploadImage() {
  ipfs.uploadFileToIpfs(imageViewer.file);
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', renderImage, false);

const upload = document.getElementById('upload');
upload.addEventListener('click', uploadImage, false);
