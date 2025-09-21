import { useState } from 'react';
import { env } from '../config/env';

// Initialize Neynar client (conditional to avoid process errors)
let neynarClient: any = null;
if (typeof window !== 'undefined' && env.NEYNAR_API_KEY) {
  try {
    const { NeynarAPIClient } = require('@neynar/nodejs-sdk');
    neynarClient = new NeynarAPIClient(env.NEYNAR_API_KEY);
  } catch (error) {
    console.warn('Neynar SDK not available:', error);
  }
}

export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  followerCount: number;
  followingCount: number;
  verifications: string[];
}

export interface FarcasterCast {
  hash: string;
  text: string;
  author: FarcasterUser;
  timestamp: string;
  embeds: any[];
  reactions: {
    likes: number;
    recasts: number;
    replies: number;
  };
}

export function useFarcaster() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [casts, setCasts] = useState<FarcasterCast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserByFid = async (fid: number) => {
    if (!neynarClient) {
      setError('Neynar client not available');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const userResponse = await neynarClient.lookupUserByFid(fid);
      setUser(userResponse.result.user);
    } catch (err) {
      setError('Failed to fetch user');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserByUsername = async (username: string) => {
    if (!neynarClient) {
      setError('Neynar client not available');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const userResponse = await neynarClient.lookupUserByUsername(username);
      setUser(userResponse.result.user);
    } catch (err) {
      setError('Failed to fetch user');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCasts = async (fid: number, limit: number = 10) => {
    if (!neynarClient) {
      setError('Neynar client not available');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const castsResponse = await neynarClient.fetchUserCasts(fid, {
        limit,
      });
      
      setCasts(castsResponse.result.casts);
    } catch (err) {
      setError('Failed to fetch casts');
      console.error('Error fetching casts:', err);
    } finally {
      setLoading(false);
    }
  };

  const publishCast = async (text: string, embeds?: any[]) => {
    if (!neynarClient) {
      setError('Neynar client not available');
      throw new Error('Neynar client not available');
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Note: Publishing requires authentication
      // This would typically be done through a connected wallet or app
      const response = await neynarClient.publishCast(
        env.NEYNAR_SIGNER_UUID,
        text,
        {
          embeds,
        }
      );
      
      return response;
    } catch (err) {
      setError('Failed to publish cast');
      console.error('Error publishing cast:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const shareAchievement = async (achievement: string, nftUri?: string) => {
    const text = `🏆 Just unlocked a new achievement in Taqi Tourism: ${achievement}! 
    
🌍 Exploring the world, one route at a time.
    
#TaqiTourism #Web3 #Travel #Achievement`;

    const embeds = nftUri ? [{ url: nftUri }] : undefined;
    
    return await publishCast(text, embeds);
  };

  const shareRouteCompletion = async (routeName: string, location: string, points: number) => {
    const text = `🥾 Just completed the ${routeName} in ${location}! 
    
📍 Earned ${points} points and unlocked a new NFT!
    
Ready for the next adventure! 🚀
    
#TaqiTourism #${routeName.replace(/\s+/g, '')} #Travel #Web3`;

    return await publishCast(text);
  };

  const shareEventAttendance = async (eventName: string, location: string) => {
    const text = `🎉 Attended ${eventName} in ${location}! 
    
🎵 Amazing cultural experience and met fellow travelers.
    
Thanks Taqi Tourism for organizing! 🙏
    
#TaqiTourism #${eventName.replace(/\s+/g, '')} #Events #Travel`;

    return await publishCast(text);
  };

  return {
    user,
    casts,
    loading,
    error,
    fetchUserByFid,
    fetchUserByUsername,
    fetchUserCasts,
    publishCast,
    shareAchievement,
    shareRouteCompletion,
    shareEventAttendance,
  };
}
