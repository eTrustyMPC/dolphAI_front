import { apiClient } from './apiClient';
import { Token } from '@/components/TokenPreview/types';

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface TokenFilter {
  offset?: number;
  limit?: number;
  skip?: number;
  order?: string;
}

export interface TokensResponse {
  tokens: Token[];
  total: number;
}

class TokenService {
  async loadById(id: string): Promise<Token> {
    console.log('Loading token by id:', id);
    const encodedId = encodeURIComponent(id);
    const response = await apiClient.get<ApiResponse<Token>>(`/coins/loadById?id=${encodedId}`);
    console.log('API Response:', response.data);
    
    const tokenData: Token = {
      id: response.data.id,
      name: response.data.name,
      address: response.data.address,
      symbol: response.data.symbol,
      description: response.data.description,
      llmSummary: response.data.llmSummary,
      price: response.data.price,
      icon: response.data.icon,
      priceChange24h: response.data.priceChange24h,
      marketCapChange: response.data.marketCapChange,
      marketCap: response.data.marketCap,
      volume24h: response.data.volume24h,
      volumeChange24h: response.data.volumeChange24h,
      fdv: response.data.fdv,
      volMktCap: response.data.volMktCap,
      holders: response.data.holders,
      metrics: response.data.metrics,
      dynamics: response.data.dynamics,
      links: response.data.links,
    };
    
    return tokenData;
  }

  async getTokens(filter: TokenFilter = { offset: 0, limit: 10, skip: 0, order: 'holders DESC' }): Promise<TokensResponse> {
    const response = await apiClient.get('/coins', {
      params: {
        filter: JSON.stringify(filter)
      }
    });

    console.log('API Response:', response);

    // Map API response to Token interface
    const tokens = (response as any[]).map((item: any) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      symbol: item.symbol,
      description: item.description,
      llmSummary: item.llmSummary,
      price: item.price,
      icon: item.icon,
      priceChange24h: item.priceChange24h,
      marketCapChange: item.marketCapChange,
      marketCap: item.marketCap,
      volume24h: item.volume24h,
      volumeChange24h: item.volumeChange24h,
      fdv: item.fdv,
      volMktCap: item.volMktCap,
      holders: item.holders,
      metrics: {
        holders: item.metrics?.holders,
        volume24h: item.metrics?.volume24h,
        marketCap: item.metrics?.marketCap
      },
      dynamics: item.dynamics,
      links: item.links,
      stakingPools: item.stakingPools,
      queryCount: item.queryCount
    }));

    return {
      tokens,
      total: tokens.length
    };
  }
}

export const tokenService = new TokenService();
