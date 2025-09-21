// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title TaqiNFT
 * @dev NFT contract for tourism artifacts and achievements
 */
contract TaqiNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // NFT Categories
    enum NFTCategory {
        ARTIFACT,    // Cultural artifacts
        ACHIEVEMENT, // User achievements
        ROUTE,       // Route completion
        EVENT        // Event participation
    }
    
    struct NFTMetadata {
        NFTCategory category;
        string location;
        uint256 points;
        bool isRare;
        uint256 mintedAt;
    }
    
    mapping(uint256 => NFTMetadata) public nftMetadata;
    mapping(address => uint256[]) public userNFTs;
    mapping(NFTCategory => uint256) public categoryCount;
    
    event NFTMinted(
        address indexed to,
        uint256 indexed tokenId,
        NFTCategory category,
        string location,
        uint256 points
    );
    
    constructor() ERC721("Taqi Tourism NFT", "TAQI") Ownable(msg.sender) {}
    
    function safeMint(
        address to,
        string memory uri,
        NFTCategory category,
        string memory location,
        uint256 points,
        bool isRare
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        nftMetadata[tokenId] = NFTMetadata({
            category: category,
            location: location,
            points: points,
            isRare: isRare,
            mintedAt: block.timestamp
        });
        
        userNFTs[to].push(tokenId);
        categoryCount[category]++;
        
        emit NFTMinted(to, tokenId, category, location, points);
        
        return tokenId;
    }
    
    function getUserNFTs(address user) public view returns (uint256[] memory) {
        return userNFTs[user];
    }
    
    function getNFTMetadata(uint256 tokenId) public view returns (NFTMetadata memory) {
        return nftMetadata[tokenId];
    }
    
    function getUserPoints(address user) public view returns (uint256) {
        uint256[] memory userTokens = userNFTs[user];
        uint256 totalPoints = 0;
        
        for (uint256 i = 0; i < userTokens.length; i++) {
            totalPoints += nftMetadata[userTokens[i]].points;
        }
        
        return totalPoints;
    }
    
    // Override required by Solidity
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
}

