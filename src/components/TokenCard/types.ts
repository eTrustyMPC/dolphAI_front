import { Token } from '../TokenPreview/types';

export interface TokenScore {
  value: number;
  explanation: string;
}

export interface TokenScores {
  onChainActivity: TokenScore;
  liquidityAndTrading: TokenScore;
  whalesAndHolders: TokenScore;
  sentiment?: TokenScore; // Optional as it's coming with elizaos v2
}

export interface DefiPoolInfo {
  projectName: string;
  platformLink: string;
  pool: string;
  tvl: number;
  apy: number;
}

export interface TokenCardData extends Token {
  scores: TokenScores;
  defiPools?: DefiPoolInfo[];
  llmValueProposition?: string; // From web search LLM
  recentResearch?: string; // History of research
}
