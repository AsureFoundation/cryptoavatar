const CryptoAvatar = artifacts.require('./CryptoAvatar.sol');

module.exports = function(deployer) {
  deployer.deploy(CryptoAvatar);
};
