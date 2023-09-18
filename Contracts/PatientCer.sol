// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Patient is ERC721, ERC721URIStorage, Ownable {
    mapping (address => bool) isGovernment;
    constructor() ERC721("Patient", "P") {}
    modifier onlyGovernment () {
      require(isGovernment[msg.sender] == true, "Only regulatory to hospital");
      _;
    }
    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyGovernment
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
        function revoke(address patient, uint256[] tokenID,address newPatient) public onlyGovernment {
      transferFrom(patient, newPatient, tokenID);
    }
}