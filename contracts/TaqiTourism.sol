// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TaqiNFT.sol";
import "./TaqiCredits.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TaqiTourism
 * @dev Main contract managing tourism activities, routes, and rewards
 */
contract TaqiTourism is Ownable {
    
    TaqiNFT public nftContract;
    TaqiCredits public creditsContract;
    
    struct Route {
        uint256 id;
        string name;
        string location;
        uint256 distance;
        uint256 difficulty; // 1-5 scale
        uint256 pointsReward;
        uint256 creditsReward;
        bool isActive;
        string[] checkpoints;
    }
    
    struct Event {
        uint256 id;
        string name;
        string description;
        string location;
        uint256 startTime;
        uint256 endTime;
        uint256 maxParticipants;
        uint256 pointsReward;
        uint256 creditsReward;
        bool isActive;
        address[] participants;
    }
    
    struct UserProfile {
        string username;
        uint256 level;
        uint256 totalPoints;
        uint256 routesCompleted;
        uint256 eventsAttended;
        bool isActive;
    }
    
    mapping(uint256 => Route) public routes;
    mapping(uint256 => Event) public events;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => mapping(uint256 => bool)) public userRouteCompletions;
    mapping(address => mapping(uint256 => bool)) public userEventParticipations;
    
    uint256 public routeCounter;
    uint256 public eventCounter;
    
    event RouteCompleted(address indexed user, uint256 routeId, uint256 points, uint256 credits);
    event EventAttended(address indexed user, uint256 eventId, uint256 points, uint256 credits);
    event ProfileCreated(address indexed user, string username);
    event RouteCreated(uint256 indexed routeId, string name, string location);
    event EventCreated(uint256 indexed eventId, string name, string location);
    
    constructor(address _nftContract, address _creditsContract) Ownable(msg.sender) {
        nftContract = TaqiNFT(_nftContract);
        creditsContract = TaqiCredits(_creditsContract);
    }
    
    function createProfile(string memory username) public {
        require(bytes(userProfiles[msg.sender].username).length == 0, "Profile already exists");
        
        userProfiles[msg.sender] = UserProfile({
            username: username,
            level: 1,
            totalPoints: 0,
            routesCompleted: 0,
            eventsAttended: 0,
            isActive: true
        });
        
        emit ProfileCreated(msg.sender, username);
    }
    
    function createRoute(
        string memory name,
        string memory location,
        uint256 distance,
        uint256 difficulty,
        uint256 pointsReward,
        uint256 creditsReward,
        string[] memory checkpoints
    ) public onlyOwner returns (uint256) {
        uint256 routeId = routeCounter++;
        
        routes[routeId] = Route({
            id: routeId,
            name: name,
            location: location,
            distance: distance,
            difficulty: difficulty,
            pointsReward: pointsReward,
            creditsReward: creditsReward,
            isActive: true,
            checkpoints: checkpoints
        });
        
        emit RouteCreated(routeId, name, location);
        return routeId;
    }
    
    function createEvent(
        string memory name,
        string memory description,
        string memory location,
        uint256 startTime,
        uint256 endTime,
        uint256 maxParticipants,
        uint256 pointsReward,
        uint256 creditsReward
    ) public onlyOwner returns (uint256) {
        uint256 eventId = eventCounter++;
        
        events[eventId] = Event({
            id: eventId,
            name: name,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime,
            maxParticipants: maxParticipants,
            pointsReward: pointsReward,
            creditsReward: creditsReward,
            isActive: true,
            participants: new address[](0)
        });
        
        emit EventCreated(eventId, name, location);
        return eventId;
    }
    
    function completeRoute(uint256 routeId) public {
        require(routes[routeId].isActive, "Route not active");
        require(!userRouteCompletions[msg.sender][routeId], "Route already completed");
        require(userProfiles[msg.sender].isActive, "Profile not active");
        
        Route storage route = routes[routeId];
        
        // Update user profile
        userProfiles[msg.sender].totalPoints += route.pointsReward;
        userProfiles[msg.sender].routesCompleted++;
        userProfiles[msg.sender].level = calculateLevel(userProfiles[msg.sender].totalPoints);
        
        // Mark route as completed
        userRouteCompletions[msg.sender][routeId] = true;
        
        // Reward credits
        creditsContract.earnCredits(msg.sender, route.creditsReward, "Route completion");
        
        // Mint achievement NFT
        string memory nftUri = string(abi.encodePacked(
            "https://api.taqi.com/nft/route-", 
            uint2str(routeId)
        ));
        
        nftContract.safeMint(
            msg.sender,
            nftUri,
            TaqiNFT.NFTCategory.ROUTE,
            route.location,
            route.pointsReward,
            route.difficulty >= 4
        );
        
        emit RouteCompleted(msg.sender, routeId, route.pointsReward, route.creditsReward);
    }
    
    function attendEvent(uint256 eventId) public {
        require(events[eventId].isActive, "Event not active");
        require(!userEventParticipations[msg.sender][eventId], "Already attending event");
        require(userProfiles[msg.sender].isActive, "Profile not active");
        require(block.timestamp >= events[eventId].startTime, "Event not started");
        require(block.timestamp <= events[eventId].endTime, "Event ended");
        require(events[eventId].participants.length < events[eventId].maxParticipants, "Event full");
        
        Event storage eventData = events[eventId];
        
        // Update user profile
        userProfiles[msg.sender].totalPoints += eventData.pointsReward;
        userProfiles[msg.sender].eventsAttended++;
        userProfiles[msg.sender].level = calculateLevel(userProfiles[msg.sender].totalPoints);
        
        // Add to participants
        eventData.participants.push(msg.sender);
        userEventParticipations[msg.sender][eventId] = true;
        
        // Reward credits
        creditsContract.earnCredits(msg.sender, eventData.creditsReward, "Event attendance");
        
        // Mint event NFT
        string memory nftUri = string(abi.encodePacked(
            "https://api.taqi.com/nft/event-", 
            uint2str(eventId)
        ));
        
        nftContract.safeMint(
            msg.sender,
            nftUri,
            TaqiNFT.NFTCategory.EVENT,
            eventData.location,
            eventData.pointsReward,
            false
        );
        
        emit EventAttended(msg.sender, eventId, eventData.pointsReward, eventData.creditsReward);
    }
    
    function calculateLevel(uint256 totalPoints) internal pure returns (uint256) {
        if (totalPoints >= 1000) return 5;
        if (totalPoints >= 500) return 4;
        if (totalPoints >= 200) return 3;
        if (totalPoints >= 50) return 2;
        return 1;
    }
    
    function getUserProfile(address user) public view returns (UserProfile memory) {
        return userProfiles[user];
    }
    
    function getRoute(uint256 routeId) public view returns (Route memory) {
        return routes[routeId];
    }
    
    function getEvent(uint256 eventId) public view returns (Event memory) {
        return events[eventId];
    }
    
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}

