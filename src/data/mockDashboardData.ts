import { TokenDashboardData } from '@/components/TokenDashboard/types';

export const mockDashboardData: TokenDashboardData = {
  name: 'Sui',
  symbol: 'SUI',
  address: '0x2::sui::SUI',
  price: '1.25',
  priceChange24h: 5.2,
  marketCap: 500000000,
  marketCapChange: '+15.2%',
  volume24h: 15000000,
  volumeChange24h: '+8.5%',
  totalSupply: 10000000000,
  holders: 100000,
  dynamics: {
    weeklyActiveUsers: 125000,
    weeklyTxCount: 250000,
    weeklyVolumeChange: 5.8,
    weeklyHolderChange: 2.3,
    topHoldersConcentration: 45.2
  },
  icon: '/sui-logo.png',
  links: {
    website: 'https://sui.io',
    telegram: 'https://t.me/sui_network',
    contract: 'https://explorer.sui.io/token/0x2::sui::SUI',
    explorer: 'https://explorer.sui.io',
    whitepaper: 'https://sui.io/whitepaper'
  },
  
  // Required by TokenDashboardData
  metrics: {
    securityScore: 85,
    communityScore: 78,
    liquidityScore: 82
  },
  
  onChainMetrics: {
    transfers24h: 125000,
    activeWallets24h: 45000,
    volume24h: 15000000,
    txCount24h: 250000
  },
  description: 'The native token of the Sui blockchain platform, used for gas fees and staking.',
  llmSummary: 'Sui (SUI) demonstrates strong network growth with increasing adoption metrics. Recent protocol upgrades and partnerships suggest positive momentum.',
  valueProp: 'Sui is a Layer 1 blockchain that redefines asset ownership and empowers creators and developers with unmatched scalability.',
  
  // Analysis History
  analysisHistory: [
    {
      date: '2025-02-05',
      type: 'Deep Dive',
      tokenName: 'Ethereum',
      tokenSymbol: 'ETH',
      tokenAddress: '0x2::eth::ETH',
      llmSummary: 'Strong network growth with increasing L2 adoption. Recent protocol upgrades show positive momentum.'
    },
    {
      date: '2025-02-03',
      type: 'Basic Analysis',
      tokenName: 'Bitcoin',
      tokenSymbol: 'BTC',
      tokenAddress: '0x2::btc::BTC',
      llmSummary: 'Institutional adoption growing. Market sentiment positive after halving event.'
    },
    {
      date: '2025-02-01',
      type: 'Deep Dive',
      tokenName: 'Solana',
      tokenSymbol: 'SOL',
      tokenAddress: '0x2::sol::SOL',
      llmSummary: 'Network performance improved. DeFi ecosystem expanding rapidly.'
    },
    {
      date: '2025-01-30',
      type: 'Basic Analysis',
      tokenName: 'Cardano',
      tokenSymbol: 'ADA',
      tokenAddress: '0x2::ada::ADA',
      llmSummary: 'New DeFi protocols launching. Steady increase in developer activity.'
    },
    {
      date: '2025-01-28',
      type: 'Deep Dive',
      tokenName: 'Avalanche',
      tokenSymbol: 'AVAX',
      tokenAddress: '0x2::avax::AVAX',
      llmSummary: 'Growing institutional partnerships. Subnet adoption accelerating.'
    }
  ],

  // Staking Pools
  stakingPools: [
    {
      project: 'Bluefin',
      projectUrl: 'https://bluefin.io',
      pool: 'SUI-USDC',
      tvl: 25000000,
      apy: 12.5
    },
    {
      project: 'Aftermath',
      projectUrl: 'https://aftermath.finance',
      pool: 'SUI-USDT',
      tvl: 18000000,
      apy: 15.2
    },
    {
      project: 'Turbos',
      projectUrl: 'https://turbos.finance',
      pool: 'SUI-ETH',
      tvl: 12000000,
      apy: 18.5
    },
    {
      project: 'Kriya',
      projectUrl: 'https://kriya.finance',
      pool: 'SUI-BTC',
      tvl: 10000000,
      apy: 14.8
    },
    {
      project: 'Flow',
      projectUrl: 'https://flow.finance',
      pool: 'SUI-USDT',
      tvl: 8000000,
      apy: 16.3
    }
  ],

  // Lending Protocols
  lendingProtocols: [
    {
      name: 'Navi Protocol',
      url: 'https://navi.xyz',
      supplyApy: 8.5,
      borrowApy: 12.3,
      tvl: 45000000
    },
    {
      name: 'Scallop',
      url: 'https://scallop.io',
      supplyApy: 7.8,
      borrowApy: 11.5,
      tvl: 38000000
    },
    {
      name: 'Sui Lending',
      url: 'https://suilending.com',
      supplyApy: 6.9,
      borrowApy: 10.8,
      tvl: 32000000
    }
  ],

  // Recent News
  news: [
    {
      title: 'Sui Network Announces Major Protocol Upgrade',
      url: 'https://sui.io/blog/protocol-upgrade',
      date: '2025-02-04',
      source: 'Sui Blog'
    },
    {
      title: 'New Partnerships Drive Sui Ecosystem Growth',
      url: 'https://sui.io/blog/ecosystem-growth',
      date: '2025-02-03',
      source: 'Sui Blog'
    },
    {
      title: 'Sui TVL Reaches New All-Time High',
      url: 'https://defillama.com/sui',
      date: '2025-02-02',
      source: 'DeFiLlama'
    },
    {
      title: 'Major DeFi Protocol Launches on Sui',
      url: 'https://cointelegraph.com/news/sui-defi',
      date: '2025-02-01',
      source: 'CoinTelegraph'
    },
    {
      title: 'Sui Foundation Announces Developer Grants',
      url: 'https://sui.io/blog/developer-grants',
      date: '2025-01-31',
      source: 'Sui Blog'
    }
  ],

  scores: {
    onChainActivity: {
      value: 85,
      explanation: 'High daily active addresses and transaction count indicate strong network usage'
    },
    liquidityAndTrading: {
      value: 78,
      explanation: 'Good liquidity depth across major DEXes with healthy trading volume'
    },
    whalesAndHolders: {
      value: 72,
      explanation: 'Well-distributed token holdings with growing retail participation'
    }
  }
};
