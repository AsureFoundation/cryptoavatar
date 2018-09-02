const Eth = require('ethjs');
const CryptoAvatarData = require('cryptoavatar-contracts').CryptoAvatarData;

async function createCryptoAvatar() {
  const eth = new Eth(window.web3.currentProvider);

  const accounts = await eth.accounts();

  const networkId = await eth.net_version();
  const network = CryptoAvatarData.networks[networkId];

  return eth
    .contract(CryptoAvatarData.abi, CryptoAvatarData.bytecode, {
      from: accounts[0],
      gas: 90000
    })
    .at(network.address);
}

module.exports = {
  createCryptoAvatar
};
