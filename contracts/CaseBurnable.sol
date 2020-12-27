pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";

contract CaseBurnable is ERC721Mintable, ERC721Burnable {}
