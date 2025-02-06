interface BaseAgent {
  id: string;
  name: string;
  imageUrl: string;
  lastUpdated: string;
}

export interface Indicator {
  name: string;
  value?: string | number;
  score?: number;
  tooltip?: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface DescriptionLink {
  text: string;
  url: string;
}

export interface ValueAgent extends BaseAgent {
  type: 'value';
  description: string;
  links: DescriptionLink[];
  metrics: Record<string, string | number>; // Flexible key-value pairs for MC, supply, etc.
}

export interface ScoringAgent extends BaseAgent {
  type: 'scoring';
  score: number;
  confidence: number;
  indicators: Indicator[];
  aiSummary: string;
  calculationLogic: string;
  bgColor: string;
  links: DescriptionLink[];
}

export type Agent = ValueAgent | ScoringAgent;

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  type: 'news' | 'social';
  url?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  impact?: 'high' | 'medium' | 'low';
}

export interface AgentData {
  name: string;
  indicators: Indicator[];
  summary: string;
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export interface AgentAnalysis {
  agentName: string;
  timestamp?: string;
  lastUpdated?: string;
  score: number;
  confidence: number;
  summary: string;
  indicators?: Indicator[];
  recommendations?: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  metrics?: Array<{
    name: string;
    value: number;
    maxValue: number;
  }>;
}

export interface ValueAgentData {
  mcCap: string;
  supply: string;
  price: string;
  priceChange24h?: number;
  volume24h?: string;
  description: string;
}

export interface TokenSummaryData {
  summary: string;
  agent: string;
  score: number;
  confidence: number;
  lastUpdated: string;
}

export interface TokenData {
  address: string;
  name: string;
  symbol: string;
  indicators: Indicator[];
  summary: string;
  valueAgent: ValueAgentData;
  tokenSummary: TokenSummaryData;
  agentAnalyses: AgentAnalysis[];
  news: NewsItem[];
}
