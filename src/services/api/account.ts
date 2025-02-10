import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api.config';

import { Token } from '@/components/TokenPreview/types';

export interface AccountResponse {
  id: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountRequest {
  id: string;
}

export interface ConnectRequest {
  walletAddress: string;
  signature: string;
  message: string;
}

export interface ConnectResponse {
  token: string;
  accountId: string;
}

export interface ApiTokenResponse {
  id: string;
  address: string;
  coinType: string;
  coinName: string;
  coinSymbol: string;
  imgUrl: string;
  description: string;
  securityMessage: string;
  decimals: number;
  price: number;
  dominance: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  volume: number;
  fdv: number;
  holdersCount: number;
  isVerified: boolean;
  isBridged: boolean;
  socialWebsite: string;
  socialDiscord: string;
  socialGitHub: string;
  socialTelegram: string;
  socialTwitter: string;
  queryCount: number;
  uniqueQueryCount: number;
  gptSummary: string;
  onChainAt: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to convert API token response to application Token type
export const mapApiTokenToAppToken = (apiToken: ApiTokenResponse): Token => ({
  id: apiToken.id,
  name: apiToken.coinName,
  symbol: apiToken.coinSymbol,
  address: apiToken.address,
  description: apiToken.description,
  llmSummary: apiToken.gptSummary,
  price: apiToken.price.toString(),
  icon: apiToken.imgUrl,
  marketCap: apiToken.marketCap,
  volume24h: apiToken.volume,
  fdv: apiToken.fdv,
  maxSupply: apiToken.maxSupply,
  circulatingSupply: apiToken.circulatingSupply,
  totalSupply: apiToken.totalSupply,
  holders: apiToken.holdersCount,
  links: {
    website: apiToken.socialWebsite,
    telegram: apiToken.socialTelegram,
    explorer: `https://suiexplorer.com/object/${apiToken.address}` // Assuming Sui blockchain
  },
  // These fields aren't available in the API response, setting defaults
  marketCapChange: '0',
  volumeChange24h: '0',
  priceChange24h: 0
});

export class AccountService {
  private static instance: AccountService;
  private constructor() {}

  static getInstance(): AccountService {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }
    return AccountService.instance;
  }

  async connect(request: ConnectRequest): Promise<ConnectResponse> {
    try {
      const url = API_CONFIG.ENDPOINTS.ACCOUNT.CONNECT.replace('{id}', request.walletAddress);
      const response = await apiClient.put<ConnectResponse>(
        url,
        {
          signature: request.signature,
          message: request.message
        }
      );
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      console.error('Error in connect:', error);
      throw error;
    }
  }

  async findOrCreateAccount(id: string): Promise<AccountResponse> {
    try {
      const response = await apiClient.put<AccountResponse>(
        `${API_CONFIG.ENDPOINTS.ACCOUNT.BASE}/${id}/connect`,
        { id }
      );
      return response;
    } catch (error) {
      console.error('Error in findOrCreateAccount:', error);
      throw error;
    }
  }

  async getWatchlist(walletAddress: string): Promise<Token[]> {
    try {
      const url = API_CONFIG.ENDPOINTS.ACCOUNT.FAVORITE_COINS.replace('{id}', walletAddress);
      const response = await apiClient.get<ApiTokenResponse[]>(url);
      console.log('Watchlist response:', response); // Debug log
      return Array.isArray(response) ? response.map(mapApiTokenToAppToken) : [];
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      throw error;
    }
  }

  async addToWatchlist(walletAddress: string, tokenId: string): Promise<void> {
    console.log('AccountService: Adding to watchlist', { walletAddress, tokenId });
    try {
      const url = `${API_CONFIG.ENDPOINTS.ACCOUNT.ADD_FAVORITE.replace('{id}', walletAddress)}?coinId=${encodeURIComponent(tokenId)}`;
      await apiClient.put(url);
    } catch (error) {
      console.error('Error adding token to watchlist:', error);
      throw error;
    }
  }

  async removeFromWatchlist(walletAddress: string, tokenId: string): Promise<void> {
    console.log('AccountService: Removing from watchlist', { walletAddress, tokenId });
    try {
      const url = `${API_CONFIG.ENDPOINTS.ACCOUNT.REMOVE_FAVORITE.replace('{id}', walletAddress)}?coinId=${encodeURIComponent(tokenId)}`;
      await apiClient.delete(url);
    } catch (error) {
      console.error('Error removing token from watchlist:', error);
      throw error;
    }
  }
}

// Export a singleton instance


export const accountService = AccountService.getInstance();
