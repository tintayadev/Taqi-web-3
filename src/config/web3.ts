import { createConfig, http } from 'wagmi';
import { baseSepolia, base } from 'wagmi/chains';
import { coinbaseWallet, metaMask } from 'wagmi/connectors';
import { env } from './env';

// Contract addresses (update these after deployment)
export const CONTRACT_ADDRESSES = {
  TAQI_CREDITS: env.TAQI_CREDITS_ADDRESS,
  TAQI_NFT: env.TAQI_NFT_ADDRESS,
  TAQI_TOURISM: env.TAQI_TOURISM_ADDRESS,
};

// Base Sepolia configuration
export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'Taqi Tourism',
      appLogoUrl: 'https://taqi.com/logo.png',
    }),
  ],
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
    [base.id]: http('https://mainnet.base.org'),
  },
});

// ABI definitions
export const TAQI_CREDITS_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
] as const;

export const TAQI_NFT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function safeMint(address to, string memory uri, uint8 category, string memory location, uint256 points, bool isRare) external",
  "function getUserNFTs(address user) view returns (uint256[])",
  "function getNFTMetadata(uint256 tokenId) view returns (tuple(uint8 category, string location, uint256 points, bool isRare, uint256 mintedAt))",
  "function getUserPoints(address user) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event NFTMinted(address indexed to, uint256 indexed tokenId, uint8 category, string location, uint256 points)"
] as const;

export const TAQI_TOURISM_ABI = [
  "function createProfile(string memory username) external",
  "function createRoute(string memory name, string memory location, uint256 distance, uint256 difficulty, uint256 pointsReward, uint256 creditsReward, string[] memory checkpoints) external returns (uint256)",
  "function createEvent(string memory name, string memory description, string memory location, uint256 startTime, uint256 endTime, uint256 maxParticipants, uint256 pointsReward, uint256 creditsReward) external returns (uint256)",
  "function completeRoute(uint256 routeId) external",
  "function attendEvent(uint256 eventId) external",
  "function getUserProfile(address user) view returns (tuple(string username, uint256 level, uint256 totalPoints, uint256 routesCompleted, uint256 eventsAttended, bool isActive))",
  "function getRoute(uint256 routeId) view returns (tuple(uint256 id, string name, string location, uint256 distance, uint256 difficulty, uint256 pointsReward, uint256 creditsReward, bool isActive, string[] checkpoints))",
  "function getEvent(uint256 eventId) view returns (tuple(uint256 id, string name, string description, string location, uint256 startTime, uint256 endTime, uint256 maxParticipants, uint256 pointsReward, uint256 creditsReward, bool isActive, address[] participants))",
  "event ProfileCreated(address indexed user, string username)",
  "event RouteCompleted(address indexed user, uint256 routeId, uint256 points, uint256 credits)",
  "event EventAttended(address indexed user, uint256 eventId, uint256 points, uint256 credits)"
] as const;

// NFT Categories enum
export enum NFTCategory {
  ARTIFACT = 0,
  ACHIEVEMENT = 1,
  ROUTE = 2,
  EVENT = 3
}

// Network configuration
export const NETWORK_CONFIG = {
  baseSepolia: {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  base: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};
