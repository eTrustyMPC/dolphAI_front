import { Token } from '../TokenPreview/types';

export interface AnalysisHistory {
  date: string;
  type: string;  // e.g., 'Basic Analysis', 'Deep Dive', etc.
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
  llmSummary: string;
}

export interface StakingPool {
  project: string;
  projectUrl: string;
  pool: string;
  tvl: number;
  apy: number;
}

export interface LendingProtocol {
  name: string;
  url: string;
  supplyApy: number;
  borrowApy: number;
  tvl: number;
}

export interface NewsItem {
  title: string;
  url: string;
  date: string;
  source: string;
}

export interface TokenMetrics {
  securityScore: number;
  communityScore: number;
  liquidityScore: number;
  // Add other metrics as needed
}

export interface OnChainMetrics {
  transfers24h: number;
  activeWallets24h: number;
  volume24h: number;
  txCount24h: number;
}

export interface TokenScore {
  value: number;
  explanation: string;
}

export interface TokenScores {
  onChainActivity: TokenScore;
  liquidityAndTrading: TokenScore;
  whalesAndHolders: TokenScore;
}

export interface TokenDashboardData extends Token {
  metrics: TokenMetrics;
  onChainMetrics: OnChainMetrics;
  analysisHistory: AnalysisHistory[];
  stakingPools: StakingPool[];
  lendingProtocols: LendingProtocol[];
  news: NewsItem[];
  scores: TokenScores;
}
