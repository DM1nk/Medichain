// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Perscription is ERC721, ERC721URIStorage, Ownable {
    
    mapping (address => bool) isHospital;
    // mapping (address => bool) i;
    mapping (address => bool) isGovernment;
    mapping (address => bool) isPharmarcy;
    constructor() ERC721("Hospital", "H") {
      isHospital[msg.sender] = true;
    }

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyOwner
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
    modifier onlyHospital () {
      require(isHospital[msg.sender] == true, "Only regulatory to hospital");
      _;
    }

    modifier onlyGovernment () {
      require(isGovernment[msg.sender] == true, "Only regulatory to hospital");
      _;
    }
    function grantHospital(address hospitalAdd) public onlyGovernment {
      isHospital[hospitalAdd] = true;
      isPharmarcy[hospitalAdd] = true;
    }

    function grantPharmarcy(address pharmarcyAdd) public onlyGovernment {
      isPharmarcy[pharmarcyAdd] = true;
    }

    function revoke(address patient, uint256 tokenID) public onlyGovernment {
      
    }

    
}