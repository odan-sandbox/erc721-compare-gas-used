pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol";

contract CaseEnumerable is ERC721Mintable, ERC721Enumerable {}
