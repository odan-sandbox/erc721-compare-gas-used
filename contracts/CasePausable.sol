pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Pausable.sol";

contract CasePausable is ERC721Mintable, ERC721Pausable {}
