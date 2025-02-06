import { TokenData, NewsItem, AgentAnalysis } from '../types/agent';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AgentService {
  private mockTokenData: TokenData = {
    address: '0x1234...5678',
    name: 'Ethereum',
    symbol: 'ETH',
    indicators: [
      { name: 'Security', score: 92, trend: 'up' },
      { name: 'Performance', score: 88, trend: 'stable' },
      { name: 'Reliability', score: 95, trend: 'up' }
    ],
    summary: 'Strong network fundamentals with increasing adoption and robust security measures.',
    valueAgent: {
      mcCap: '$259.8B',
      supply: '120.27M',
      price: '$2,158.24',
      priceChange24h: 2.5,
      volume24h: '$14.2B',
      description: 'Ethereum shows strong market performance with steady growth in key metrics. Recent network upgrades have improved scalability and efficiency.'
    },
    tokenSummary: {
      summary: 'Based on comprehensive analysis of on-chain data and market indicators, Ethereum maintains its position as a leading smart contract platform with strong developer activity and growing institutional adoption.',
      agent: 'DolphAI Analytics',
      score: 90,
      confidence: 0.95,
      lastUpdated: new Date().toISOString()
    },
    agentAnalyses: [
      {
        agentName: 'Security Agent',
        score: 92,
        summary: 'Contract security analysis reveals robust implementation with no vulnerabilities. Multi-sig controls and timelock mechanisms in place.',
        confidence: 0.98,
        lastUpdated: new Date().toISOString(),
        metrics: [
          { name: 'Code Quality', value: 95, maxValue: 100 },
          { name: 'Audit Score', value: 90, maxValue: 100 },
          { name: 'Risk Level', value: 15, maxValue: 100 }
        ]
      },
      {
        agentName: 'Market Agent',
        score: 88,
        summary: 'Strong market metrics with healthy liquidity across major DEXs. Growing institutional interest observed.',
        confidence: 0.92,
        lastUpdated: new Date().toISOString(),
        metrics: [
          { name: 'Liquidity', value: 85, maxValue: 100 },
          { name: 'Volume', value: 88, maxValue: 100 },
          { name: 'Holder Distribution', value: 92, maxValue: 100 }
        ]
      },
      {
        agentName: 'Network Agent',
        score: 95,
        summary: 'Excellent network performance with high throughput and low latency. L2 adoption driving scalability improvements.',
        confidence: 0.96,
        lastUpdated: new Date().toISOString(),
        metrics: [
          { name: 'TPS', value: 92, maxValue: 100 },
          { name: 'Latency', value: 95, maxValue: 100 },
          { name: 'Decentralization', value: 88, maxValue: 100 }
        ]
      }
    ],
    news: [
      {
        id: '1',
        title: 'Major Protocol Upgrade Successfully Implemented',
        source: 'Ethereum Blog',
        date: '2h ago',
        type: 'news',
        sentiment: 'positive',
        impact: 'high',
        url: 'https://blog.ethereum.org'
      },
      {
        id: '2',
        title: 'Community Discussion: New EIP Proposal',
        source: 'Discord',
        date: '4h ago',
        type: 'social',
        sentiment: 'neutral',
        impact: 'medium'
      },
      {
        id: '3',
        title: 'Q1 2025 Network Statistics Released',
        source: 'Medium',
        date: '6h ago',
        type: 'news',
        sentiment: 'positive',
        impact: 'medium',
        url: 'https://medium.com/ethereum'
      }
    ]
  };

  async getTokenData(address: string): Promise<TokenData> {
    await delay(1000); // Simulate network delay
    return this.mockTokenData;
  }

  async getLatestNews(address: string, limit: number = 5): Promise<NewsItem[]> {
    await delay(500);
    return this.mockTokenData.news.slice(0, limit);
  }

  async getAgentAnalyses(address: string): Promise<AgentAnalysis[]> {
    await delay(800);
    return this.mockTokenData.agentAnalyses;
  }

  async searchToken(query: string): Promise<TokenData | null> {
    await delay(500);
    if (query.toLowerCase().includes('eth')) {
      return this.mockTokenData;
    }
    return null;
  }
}

export const agentService = new AgentService();
