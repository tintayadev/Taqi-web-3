// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/**
 * @title TaqiCredits
 * @dev ERC20 token for tourism credits and rewards
 */
contract TaqiCredits is ERC20, ERC20Burnable, Ownable {
    
    mapping(address => bool) public authorizedMinters;
    mapping(address => uint256) public userRewards;
    
    event CreditsEarned(address indexed user, uint256 amount, string reason);
    event CreditsSpent(address indexed user, uint256 amount, string reason);
    
    constructor() ERC20("Taqi Credits", "TAQI-CREDITS") Ownable(msg.sender) {
        // Initial supply: 1,000,000 tokens
        _mint(msg.sender, 1000000 * 10**decimals());
    }
    
    modifier onlyAuthorized() {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }
    
    function addAuthorizedMinter(address minter) public onlyOwner {
        authorizedMinters[minter] = true;
    }
    
    function removeAuthorizedMinter(address minter) public onlyOwner {
        authorizedMinters[minter] = false;
    }
    
    function earnCredits(
        address user,
        uint256 amount,
        string memory reason
    ) public onlyAuthorized {
        _mint(user, amount);
        userRewards[user] += amount;
        
        emit CreditsEarned(user, amount, reason);
    }
    
    function spendCredits(
        address user,
        uint256 amount,
        string memory reason
    ) public onlyAuthorized {
        require(balanceOf(user) >= amount, "Insufficient credits");
        _burn(user, amount);
        
        emit CreditsSpent(user, amount, reason);
    }
    
    function getUserRewards(address user) public view returns (uint256) {
        return userRewards[user];
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

