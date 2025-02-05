export interface TokenDynamics {
  weeklyActiveUsers?: number;
  weeklyTxCount?: number;
  weeklyVolumeChange?: number;
  weeklyHolderChange?: number;
  topHoldersConcentration?: number;
}

export interface TokenUpdate {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

export interface Token {
  name: string;
  address: string;
  symbol: string;
  description?: string;  // Onchain description
  llmSummary?: string;  // LLM-generated analysis
  price: string;
  icon?: string;
  priceChange24h?: number;
  marketCap?: number;
  volume24h?: number;
  totalSupply?: number;
  valueProp?: string;
  dynamics?: TokenDynamics;
  recentArticles?: {
    title: string;
    url: string;
  }[];
  recentUpdates?: TokenUpdate[];
  links: {
    website?: string;
    twitter?: string;
    discord?: string;
    contract?: string;
  };
  holders?: number;
}

export interface TokenMetrics {
  holders: number;
  volume: number;
  marketCap: number;
  liquidity: number;
  priceChange24h: number;
}

export interface TokenActionProps {
  tokenId: string;
  onBuy?: () => void;
  onSell?: () => void;
}
