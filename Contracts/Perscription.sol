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
    uint256 fillsCounter;
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
      uint256 requestID;
      uint256 tokenID;
      address requester;
      bool approved;
    }

    Query[] public request;

    event query(address,uint256 tokenId);

    function queryRequest(uint256 tokenId)public{
      request.push(Query(requestsCount++,tokenId,msg.sender,false));
    }

    function requestRespone(uint256 requestID)public{
      require(requestID>0&&requestID<=requestsCount,"Request doesn't exist");
      require(msg.sender==ownerOf(request[requestID-1].tokenID),"You are not the owner");
      request[requestID].approved=true;
    }

    function queryEvent(uint256 requestID)public{
      require(requestID>0&&requestID<=requestsCount,"Request doesn't exist");
      require(msg.sender==request[requestID-1].requester,"You are not the requester");
      require(request[requestID-1].approved,"Request is not approved");
      emit query(request[requestID-1].requester, request[requestID-1].tokenID);
    }

    struct Fill{
      uint requestID;
      uint256 tokenID;
      address requester;
      address authority;
      bool approved;
      bool authorityApproved;
      bytes32 proof;
    }

    Fill[] public  fill;

    event fillPrescription(address,uint256 tokenId,address authority,bytes32 proof);
    function fillRequest(uint256 tokenId,bytes32 proof,address authority)public{
      
      fill.push();
      fill[fillsCounter].requestID=fillsCounter++;
      fill[fillsCounter].tokenID=tokenId;
      fill[fillsCounter].requester=msg.sender;
      fill[fillsCounter].authority=authority;
      fill[fillsCounter].approved=false;
      fill[fillsCounter].authorityApproved=false;
      fill[fillsCounter].proof=proof;
    }

    function fillRespone(uint requestID)public{
      require(requestID>0&&requestID<=requestsCount,"Request doesn't exist");
      require(msg.sender==ownerOf(fill[requestID-1].tokenID),"You are not the owner");
      fill[requestID].approved=true;
    
    }
    
    function fillPermit(uint requestID)public{
      require(requestID>0&&requestID<=requestsCount,"Request doesn't exist");
      require(msg.sender==fill[requestID-1].authority,"You are not the respone authority");
      fill[requestID].authorityApproved=true;
    }

    function fillEvent(uint256 requestID)public{
      require(requestID>0&&requestID<=fillsCounter,"Request doesn't exist");
      require(msg.sender==fill[requestID-1].requester,"You are not the requester");
      require(fill[requestID-1].approved==true&&fill[requestID-1].authorityApproved,"Request is not approved");
      emit fillPrescription(fill[requestID-1].requester, fill[requestID-1].tokenID,fill[requestID-1].authority,fill[requestID-1].proof);
    }

    function revoke(address patient,uint[] memory tokenID,address newPatient) public onlyGovernment {
        for(uint i=0;i<=tokenID.length;i++){
        transferFrom(patient, newPatient, tokenID[i]);
        }
    }
    
}