//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@1001-digital/erc721-extensions/contracts/RandomlyAssigned.sol";
import "hardhat/console.sol";

contract SupacoinNFT is ERC721URIStorage, Ownable, RandomlyAssigned {
  using Strings for uint256;
  uint256 public currentSupply = 0;
  string private tempURI;
  uint256 public prevTokenID;
  // We need to pass the name of our NFTs token and it's symbol.
  constructor(
    string memory name,
    string memory symbol,
    string memory _tempURI,
    uint256 maxTokens
  ) ERC721(name, symbol) RandomlyAssigned(maxTokens,1) {
    tempURI = _tempURI; // set internal base uri

    for (uint256 a = 1; a <= 5; a++) {
          mint();
    }
  }

  event NewSupacoinNFTMinted(address sender, uint256 tokenId);

  function mint() public payable {
    // check if the user have enough money to mint
    uint256 mintCost = 0.000028 ether; // mint cost is 1/.99 US

    require( tokenCount() + 1 <= totalSupply(), "YOU CAN'T MINT MORE THAN MAXIMUM SUPPLY");
    require( availableTokenCount() - 1 >= 0, "YOU CAN'T MINT MORE THAN AVALABLE TOKEN COUNT"); 
    require( tx.origin == msg.sender, "CANNOT MINT THROUGH A CUSTOM CONTRACT");

     if (msg.sender != owner()) { 
        require( msg.sender.balance>= mintCost, "Insufficient Founds");
      }

    uint256 id = nextToken();

    prevTokenID = id;

    string memory finalTokenUri = string(
      abi.encodePacked(tempURI, id.toString())
    );

    _safeMint(msg.sender, id);

    // Update your URI!!!
    _setTokenURI(id, finalTokenUri);

    console.log(id.toString());
    emit NewSupacoinNFTMinted(msg.sender, id);
  }

  function getTokenCount() public view returns (uint256) {
    return tokenCount();
  }

  function getPreviousToken()  public view returns (uint256) { 
    return prevTokenID;
  }

   function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }
}
