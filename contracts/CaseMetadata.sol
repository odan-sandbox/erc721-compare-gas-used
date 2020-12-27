pragma solidity ^0.5.17;

import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol";

contract CaseMetadata is ERC721Mintable, ERC721Metadata {
    // solhint-disable-next-line no-empty-blocks
    constructor() public ERC721Metadata("test", "TST") {}
}
