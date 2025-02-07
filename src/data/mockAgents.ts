import { Agent, ValueAgent, ScoringAgent } from '@/types/agent';

export const mockValueAgent: ValueAgent = {
  id: 'value-agent-1',
  type: 'value',
  name: 'Value Analysis Agent',
  imageUrl: '/images/agents/value-agent.png',
  lastUpdated: '2025-02-07T12:00:00Z',
  description: 'Token exhibits strong fundamentals with robust liquidity metrics. Market cap growth shows sustainable trajectory. Network activity indicates healthy adoption rate. Recent developments suggest positive momentum in ecosystem expansion.',
  links: [
    { text: 'View Detailed Report', url: '#' },
    { text: 'Historical Data', url: '#' }
  ],
  metrics: {
    marketCap: '$1.2B',
    volume24h: '$45M',
    holders: '12,450'
  }
};

export const mockScoringAgent: ScoringAgent = {
  id: 'scoring-agent-1',
  type: 'scoring',
  name: 'Risk Assessment Agent',
  imageUrl: '/images/agents/risk-agent.png',
  lastUpdated: '2025-02-07T12:00:00Z',
  score: 8.5,
  confidence: 0.92,
  bgColor: 'bg-blue-900/20',
  calculationLogic: 'Score based on liquidity depth, holder distribution, and market activity patterns',
  aiSummary: 'Token demonstrates strong resilience in market volatility. Liquidity metrics show healthy depth across major DEXs. Holder distribution indicates balanced ownership structure.',
  indicators: [
    { name: 'Liquidity Score', value: 9.2, tooltip: 'Deep liquidity across major DEXs' },
    { name: 'Holder Distribution', value: 8.7, tooltip: 'Well-distributed token ownership' },
    { name: 'Market Activity', value: 8.1, tooltip: 'Consistent trading volume' }
  ],
  links: [
    { text: 'Risk Report', url: '#' },
    { text: 'Market Analysis', url: '#' }
  ]
};
