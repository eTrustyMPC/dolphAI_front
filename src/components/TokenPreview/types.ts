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

export interface TokenMetrics {
  holders?: number;
  volume24h?: number;
  marketCap?: number;
}

export interface Token {
  id: string;
  name: string;
  address: string;
  symbol: string;
  description?: string;  // Onchain description
  llmSummary?: string;  // LLM-generated analysis
  price: string;
  icon?: string;
  priceChange24h?: number;
  marketCapChange: string;
  marketCap?: number;
  volume24h?: number;
  volumeChange24h: string;
  fdv?: number;  // Fully Diluted Valuation
  volMktCap?: number;  // Volume/Market Cap ratio
  maxSupply?: number;  // Maximum supply
  circulatingSupply?: number;  // Circulating supply
  totalSupply?: number;  // Total supply
  valueProp?: string;
  dynamics?: TokenDynamics;
  metrics?: TokenMetrics;
  recentArticles?: {
    title: string;
    url: string;
  }[];
  recentUpdates?: TokenUpdate[];
  links: {
    website?: string;
    whitepaper?: string;
    contract?: string;
    explorer?: string;
    telegram?: string;
  };
  holders?: number;
  queryCount?: number;
}

export interface OnChainMetrics {
  dailyTransactions?: number;
  dailyActiveUsers?: number;
  totalHolders?: number;
  liquidityUSD?: number;
  volumeUSD24h?: number;
}

export interface AnalysisHistory {
  timestamp: string;
  analysis: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score?: number;
}

export interface TokenDashboardData extends Token {
  metrics: TokenMetrics;
  onChainMetrics: OnChainMetrics;
  analysisHistory: AnalysisHistory[];
}

export interface TokenMetrics {
  holders?: number;
  volume?: number;
  marketCap?: number;
  marketCapChange?: number;
  liquidity?: number;
  priceChange24h?: number;
  volume24h?: number;
}

export interface TokenActionProps {
  tokenId: string;
  onBuy?: () => void;
  onSell?: () => void;
}
