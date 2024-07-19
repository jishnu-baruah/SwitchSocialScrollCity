const MyNFT = artifacts.require("MyNFT");

module.exports = function (deployer) {
  deployer.deploy(MyNFT, "0x2134Edd2F7dFc24Dd616cedC12a14D6FF77144e3");
};
