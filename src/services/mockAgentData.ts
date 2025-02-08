import { Agent, ValueAgent, ScoringAgent } from '@/types/agent';

export const mockValueAgent: ValueAgent = {
  id: 'value-agent-1',
  type: 'value',
  name: 'Token Value Analysis Agent',
  imageUrl: '/images/doplhin-tech.png',
  lastUpdated: '2025-02-06T13:00:00Z',
  description: 'The token demonstrates robust fundamentals with a steady market cap growth of 25% over the last quarter. Recent trading activity shows increasing volume across major DEXs, particularly on Uniswap and PancakeSwap. The token maintains healthy liquidity pools with a combined TVL of $45M across platforms.',
  links: [
    { text: 'View on DexScreener', url: 'https://dexscreener.com' },
    { text: 'Uniswap Pool', url: 'https://uniswap.org' },
    { text: 'Holder Analytics', url: 'https://etherscan.io' }
  ],
  metrics: {}
};

export const mockScoringAgents: ScoringAgent[] = [
  {
    id: 'flipper-agent',
    type: 'scoring',
    name: 'FLIPPER',
    imageUrl: '/images/dolphin-circuit.png',
    lastUpdated: '2025-02-06T13:00:00Z',
    score: 8.5,
    confidence: 0.92,
    calculationLogic: 'Score = (FA Score × 0.3) + (On-chain Score × 0.25) + (Market Score × 0.25) + (Social Score × 0.2). Higher weight given to fundamental analysis and on-chain metrics as key indicators of project health.',
    indicators: [
      { name: 'On-chain Agent', value: 8.8, tooltip: 'Based on tokenomics, utility, and ecosystem growth metrics' },
      { name: 'Defi Agent', value: 8.5, tooltip: 'Analysis of transaction patterns, wallet behaviors, and smart contract usage' },
      { name: 'Sentimental Analysis Agent', value: 8.2, tooltip: 'DeFi metrics including TVL growth, yield opportunities, and protocol revenue' },
    ],
    aiSummary: 'SUI ecosystem shows strong growth with TVL increasing by 45% this quarter across DeFi protocols. Integration with major platforms like Scallop and Navi Protocol demonstrates growing institutional adoption. The ecosystem maintains robust development activity with over 200 active monthly developers.',
    bgColor: 'bg-indigo-900/20',
    links: [
    ]
  },
  {
    id: 'fa-agent',
    type: 'scoring',
    name: 'On-chain Analysis Agent',
    imageUrl: '/images/dolphin-chart.png',
    lastUpdated: '2025-02-06T13:00:00Z',
    score: 8.8,
    confidence: 0.90,
    calculationLogic: 'Score based on comprehensive analysis of tokenomics, utility, and ecosystem growth metrics.',
    indicators: [
      { name: 'Tokenomics', value: 9.0, tooltip: 'Token distribution, vesting schedules, and supply dynamics' },
      { name: 'Utility Score', value: 8.5, tooltip: 'Real-world applications and integration with SUI ecosystem' },
      { name: 'Ecosystem Growth', value: 9.0, tooltip: 'Developer adoption, protocol integrations, and TVL growth' }
    ],
    aiSummary: 'SUI demonstrates strong utility with Move language enabling secure smart contract development and efficient resource management. The tokenomics model shows balanced distribution with effective staking mechanisms and validator incentives.',
    bgColor: 'bg-purple-900/20',
    links: [
      { text: 'Latest: SUI Network Upgrade', url: 'https://suiexplorer.com/news/upgrade' },
      { text: 'DeFi Growth Report Q1', url: 'https://suiexplorer.com/news/defi-q1' },
      { text: 'New Validator Onboarding', url: 'https://suiexplorer.com/news/validators' },
      { text: 'Ecosystem Fund Launch', url: 'https://suiexplorer.com/news/fund' },
      { text: 'Developer Tooling Update', url: 'https://suiexplorer.com/news/tools' }
    ]
  },
  {
    id: 'blockchain-detective',
    type: 'scoring',
    name: 'Blockchain Detective',
    imageUrl: '/images/doplhin-nft.png',
    lastUpdated: '2025-02-06T13:00:00Z',
    score: 8.2,
    confidence: 0.88,
    calculationLogic: 'Score derived from analysis of on-chain metrics, transaction patterns, and wallet behaviors.',
    indicators: [
      { name: 'Transaction Growth', value: 8.0, tooltip: 'Month-over-month increase in transaction volume and count' },
      { name: 'Wallet Activity', value: 8.5, tooltip: 'Active addresses and interaction patterns' },
      { name: 'Smart Contract Usage', value: 8.0, tooltip: 'Deployment frequency and contract interactions' }
    ],
    aiSummary: 'Analysis shows healthy network growth with daily active addresses increasing 30% month-over-month. Smart contract deployments have doubled in the past quarter, particularly in DeFi and NFT sectors. Transaction patterns indicate growing institutional participation with significant increase in large-value transfers.',
    bgColor: 'bg-blue-900/20',
    links: [
      { text: 'Network Stats', url: 'https://suiexplorer.com/network-stats' },
      { text: 'Top Dapps', url: 'https://suiexplorer.com/dapps' },
      { text: 'Transaction Analysis', url: 'https://suiexplorer.com/transactions' }
    ]
  },
  {
    id: 'market-strategist',
    type: 'scoring',
    name: 'Market Strategist',
    imageUrl: '/images/dolphin-defi.png',
    lastUpdated: '2025-02-06T13:00:00Z',
    score: 8.4,
    confidence: 0.89,
    calculationLogic: 'Score calculated from DeFi metrics including TVL growth, yield opportunities, and protocol revenue.',
    indicators: [
      { name: 'TVL Growth', value: 8.5, tooltip: 'Total Value Locked growth across DeFi protocols' },
      { name: 'Yield Opportunities', value: 8.0, tooltip: 'Available APY and farming opportunities' },
      { name: 'Protocol Revenue', value: 8.8, tooltip: 'Fee generation and revenue distribution metrics' }
    ],
    aiSummary: 'DeFi ecosystem on SUI shows remarkable growth with Scallop DEX reaching $100M TVL. New yield farming opportunities emerging with competitive APYs in stable asset pools. Cross-chain bridges and liquid staking derivatives creating additional value capture mechanisms.',
    bgColor: 'bg-emerald-900/20',
    links: [
      { text: 'Scallop Analytics', url: 'https://app.scallop.io' },
      { text: 'Navi Stats', url: 'https://app.naviprotocol.io' },
      { text: 'Yield Overview', url: 'https://defillama.com/yields?chain=Sui' }
    ]
  }
];
