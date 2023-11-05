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
    uint256 requestsCount;
    constructor() ERC721("Hospital", "H") {
      isHospital[msg.sender] = true;
    }

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyHospital
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
    struct Query{
      uint requestID;
      uint256 tokenID;
      address requester;
      bool approved;
    }
    Query[] public request;
    event query(address,uint256 tokenId);
    function queryRequest(uint256 tokenId)public{
      request.push(Query(requestsCount++,tokenId,msg.sender,false));
    }
    function requestRespone(uint requestID)public{
      require(requestID>0&&requestID<=requestsCount,"Request doesn't exist");
      require(msg.sender==ownerOf(request[requestID-1].tokenID),"You are not the owner");
      request[requestID].approved=true;
      emit query(request[requestID-1].requester, request[requestID-1].tokenID);
    }
    struct Fill{
      uint requestID;
      uint256 tokenID;
      address requester;
      bool approved;
    }
    Query[] public fill;
    event fillPrescription(address,uint256 tokenId,string proof);
    function fillRequest(uint256 tokenId)public{
      request.push(Query(requestsCount++,tokenId,msg.sender,false));
    }
    function fillRespone(uint requestID)public{
      require(requestID>0&&requestID<=requestsCount,"Request doesn't exist");
      require(msg.sender==ownerOf(request[requestID-1].tokenID),"You are not the owner");
      request[requestID].approved=true;
      emit query(request[requestID-1].requester, request[requestID-1].tokenID);
    }
    function revoke(address patient,uint[] memory tokenID,address newPatient) public onlyGovernment {
        for(uint i=0;i<=tokenID.length;i++){
        transferFrom(patient, newPatient, tokenID[i]);
        }
    }
    
}