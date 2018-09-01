const IPFS = require('ipfs-api');
const utils = require('./utils');

async function uploadFileToIpfs(file) {
  const buffer = await utils.readFileAsArrayBuffer(file);
  const content = [
    {
      path: 'profil',
      content: buffer
    }
  ];

  const ipfs = new IPFS('ipfs.infura.io', '5001', { protocol: 'https' });
  const res = await ipfs.files.add(content);

  console.log(res);
  return res.hash;
}

module.exports = {
  uploadFileToIpfs
};
