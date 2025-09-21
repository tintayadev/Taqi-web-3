import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { CONTRACT_ADDRESSES, TAQI_CREDITS_ABI, TAQI_NFT_ABI, TAQI_TOURISM_ABI, NFTCategory } from '../config/web3';
import { formatEther } from 'viem';

export interface UserProfile {
  username: string;
  level: number;
  totalPoints: number;
  routesCompleted: number;
  eventsAttended: number;
  isActive: boolean;
}

export interface Route {
  id: number;
  name: string;
  location: string;
  distance: number;
  difficulty: number;
  pointsReward: number;
  creditsReward: number;
  isActive: boolean;
  checkpoints: string[];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
  maxParticipants: number;
  pointsReward: number;
  creditsReward: number;
  isActive: boolean;
  participants: string[];
}

export interface NFTMetadata {
  category: NFTCategory;
  location: string;
  points: number;
  isRare: boolean;
  mintedAt: number;
}

export function useTaqiContracts() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Read user profile
  const { data: userProfile, refetch: refetchProfile } = useReadContract({
    address: CONTRACT_ADDRESSES.TAQI_TOURISM,
    abi: TAQI_TOURISM_ABI,
    functionName: 'getUserProfile',
    args: address ? [address] : undefined,
  });

  // Read user credits balance
  const { data: creditsBalance, refetch: refetchCredits } = useReadContract({
    address: CONTRACT_ADDRESSES.TAQI_CREDITS,
    abi: TAQI_CREDITS_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Read user NFTs
  const { data: userNFTs, refetch: refetchNFTs } = useReadContract({
    address: CONTRACT_ADDRESSES.TAQI_NFT,
    abi: TAQI_NFT_ABI,
    functionName: 'getUserNFTs',
    args: address ? [address] : undefined,
  });

  // Read user points
  const { data: userPoints, refetch: refetchPoints } = useReadContract({
    address: CONTRACT_ADDRESSES.TAQI_NFT,
    abi: TAQI_NFT_ABI,
    functionName: 'getUserPoints',
    args: address ? [address] : undefined,
  });

  // Contract interaction functions
  const createProfile = async (username: string) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.TAQI_TOURISM,
        abi: TAQI_TOURISM_ABI,
        functionName: 'createProfile',
        args: [username],
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const completeRoute = async (routeId: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.TAQI_TOURISM,
        abi: TAQI_TOURISM_ABI,
        functionName: 'completeRoute',
        args: [BigInt(routeId)],
      });
      
      // Refetch data after successful transaction
      setTimeout(() => {
        refetchProfile();
        refetchCredits();
        refetchNFTs();
        refetchPoints();
      }, 2000);
    } catch (error) {
      console.error('Error completing route:', error);
      throw error;
    }
  };

  const attendEvent = async (eventId: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.TAQI_TOURISM,
        abi: TAQI_TOURISM_ABI,
        functionName: 'attendEvent',
        args: [BigInt(eventId)],
      });
      
      // Refetch data after successful transaction
      setTimeout(() => {
        refetchProfile();
        refetchCredits();
        refetchNFTs();
        refetchPoints();
      }, 2000);
    } catch (error) {
      console.error('Error attending event:', error);
      throw error;
    }
  };

  const getRoute = async (routeId: number): Promise<Route | null> => {
    try {
      const result = await readContract({
        address: CONTRACT_ADDRESSES.TAQI_TOURISM,
        abi: TAQI_TOURISM_ABI,
        functionName: 'getRoute',
        args: [BigInt(routeId)],
      });
      
      return result as Route;
    } catch (error) {
      console.error('Error fetching route:', error);
      return null;
    }
  };

  const getEvent = async (eventId: number): Promise<Event | null> => {
    try {
      const result = await readContract({
        address: CONTRACT_ADDRESSES.TAQI_TOURISM,
        abi: TAQI_TOURISM_ABI,
        functionName: 'getEvent',
        args: [BigInt(eventId)],
      });
      
      return result as Event;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  };

  const getNFTMetadata = async (tokenId: number): Promise<NFTMetadata | null> => {
    try {
      const result = await readContract({
        address: CONTRACT_ADDRESSES.TAQI_NFT,
        abi: TAQI_NFT_ABI,
        functionName: 'getNFTMetadata',
        args: [BigInt(tokenId)],
      });
      
      return result as NFTMetadata;
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      return null;
    }
  };

  const formatCredits = (balance: bigint | undefined) => {
    if (!balance) return '0';
    return formatEther(balance);
  };

  const refetchAll = () => {
    refetchProfile();
    refetchCredits();
    refetchNFTs();
    refetchPoints();
  };

  return {
    // Data
    userProfile: userProfile as UserProfile | undefined,
    creditsBalance: formatCredits(creditsBalance as bigint),
    userNFTs: userNFTs as bigint[] | undefined,
    userPoints: userPoints as bigint | undefined,
    
    // Functions
    createProfile,
    completeRoute,
    attendEvent,
    getRoute,
    getEvent,
    getNFTMetadata,
    refetchAll,
    
    // Utils
    formatCredits,
  };
}

// Helper function to read contract (needs to be imported from wagmi)
import { readContract } from '@wagmi/core';

