
pragma solidity ^0.4.23;

contract CryptoAvatar {
  mapping(address => bytes) private avatarList;

  constructor() public {
  }

  function setAvatar(bytes _ipfsHash) public returns (bool _success) {
    avatarList[msg.sender] = _ipfsHash;
    return true;
  }

  function getAvatar(address _addr) public view returns (bytes _ipfsHash) {
    return avatarList[_addr];
  }
}
