//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunksMMO is ERC721, Ownable {
    uint256 public minPrice;
    uint256 public totalSypply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdraWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('BigodePunks', 'BP') {
        minPrice = 0.02 ether;
        totalSypply = 0;
        maxSupply = 100000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnable(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'O token nao existe, entre em contato com o desenvolvedor');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdraWallet.call{ value: address(this).balance }('');
        require(success, 'failed transaction');
    }

    function min(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enable');
        require(msg.value == quantity_ & minPrice, 'wrong mmint value');
        require(totalSypply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'max per wallet');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSypply + i;
            totalSypply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}

