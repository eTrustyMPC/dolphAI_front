import { apiClient } from './apiClient';
import { Token } from '@/components/TokenPreview/types';

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

export const tokenService = {
  async getTokens(filter: TokenFilter = { offset: 0, limit: 10, skip: 0, order: 'holders DESC' }): Promise<TokensResponse> {
    const response = await apiClient.get('/coins', {
      params: {
        filter: JSON.stringify(filter)
      }
    });

    console.log('API Response:', response); // Debug log

    // Map API response to Token interface
    const tokens = response.map((item: any) => ({
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
};
