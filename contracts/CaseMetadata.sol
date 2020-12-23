pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol";

contract CaseMetadata is ERC721Mintable, ERC721Metadata {
    constructor () public ERC721Metadata("test", "TST") {
    }
}