const Eth = require('ethjs');
const CryptoAvatarData = require('cryptoavatar-contracts').CryptoAvatarData;

const eth = new Eth(window.web3.currentProvider);

async function getAccount() {
  const accounts = await eth.accounts();
  return accounts[0];
}

async function createCryptoAvatar() {
  const account = await getAccount();
  const networkId = await eth.net_version();
  const network = CryptoAvatarData.networks[networkId];

  return eth
    .contract(CryptoAvatarData.abi, CryptoAvatarData.bytecode, {
      from: account,
      gas: 90000
    })
    .at(network.address);
}

module.exports = {
  getAccount,
  createCryptoAvatar
};
