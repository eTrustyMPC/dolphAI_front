import { TokenCardData, TokenScores } from '@/components/TokenCard/types';

// Helper function to generate token scores
const generateScores = (activity: number, liquidity: number, whales: number): TokenScores => ({
  onChainActivity: {
    value: activity,
    explanation: `${activity > 80 ? 'High' : activity > 70 ? 'Steady' : 'Growing'} transaction volume and user engagement`
  },
  liquidityAndTrading: {
    value: liquidity,
    explanation: `${liquidity > 80 ? 'Deep' : liquidity > 70 ? 'Strong' : 'Adequate'} liquidity with ${liquidity > 80 ? 'consistent' : 'moderate'} trading volume`
  },
  whalesAndHolders: {
    value: whales,
    explanation: `${whales > 80 ? 'Well-distributed' : whales > 70 ? 'Balanced' : 'Fair'} token distribution with ${whales > 80 ? 'strong' : whales > 70 ? 'growing' : 'moderate'} holder activity`
  }
});

// Generate mock tokens with realistic data
export const mockTokens: TokenCardData[] = [
  {
    name: 'Sui',
    symbol: 'SUI',
    address: '0x2::sui::SUI',
    price: '1.25',
    scores: generateScores(85, 78, 72),
    priceChange24h: 5.2,
    marketCap: 500000000,
    volume24h: 15000000,
    totalSupply: 10000000000,
    holders: 100000,
    icon: '/sui-logo.png',
    description: 'The native token of the Sui blockchain platform, used for gas fees and staking.',
    llmSummary: 'Sui demonstrates strong network growth with increasing adoption metrics.',
    valueProp: 'Layer 1 blockchain redefining asset ownership with unmatched scalability.',
    marketCapChange: '0.5%',
    volumeChange24h: '1.2%',
    holdersChange: '0.3%',
    transactions: 1000,
    transactionsChange: '2.0%',
    liquidity: 100000,
    liquidityChange: '1.0%',
    links: {
      website: 'https://sui.io',
      twitter: 'https://twitter.com/SuiNetwork',
      discord: 'https://discord.gg/sui',
      contract: 'https://explorer.sui.io/token/sui',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/sui'
    }
  },
  {
    name: 'Scallop',
    symbol: 'SCA',
    address: '0x5::scallop::SCA',
    price: '0.85',
    scores: generateScores(75, 82, 68),
    priceChange24h: -2.1,
    marketCap: 100000000,
    volume24h: 5000000,
    totalSupply: 1000000000,
    holders: 50000,
    icon: '/scallop-logo.png',
    description: 'Scallop is a lending and borrowing protocol built on Sui.',
    llmSummary: 'Scallop shows promising growth in lending markets with increasing TVL.',
    valueProp: 'Efficient lending and borrowing services with competitive rates.',
    marketCapChange: '0.4%',
    volumeChange24h: '1.0%',
    holdersChange: '0.2%',
    transactions: 800,
    transactionsChange: '1.5%',
    liquidity: 80000,
    liquidityChange: '0.8%',
    links: {
      website: 'https://scallop.io',
      twitter: 'https://twitter.com/ScallopProtocol',
      discord: 'https://discord.gg/scallop',
      contract: 'https://explorer.sui.io/token/sca',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/scallop'
    }
  },
  {
    name: 'Aftermath',
    symbol: 'AFT',
    address: '0x6::aftermath::AFT',
    price: '2.15',
    scores: generateScores(88, 85, 78),
    priceChange24h: 8.5,
    marketCap: 200000000,
    volume24h: 8000000,
    totalSupply: 2000000000,
    holders: 75000,
    icon: '/aftermath-logo.png',
    description: 'Aftermath is a decentralized exchange and trading platform on Sui.',
    llmSummary: 'Aftermath demonstrates strong growth in DEX market share and user adoption.',
    valueProp: 'Leading DEX on Sui with innovative trading features and deep liquidity.',
    marketCapChange: '1.2%',
    volumeChange24h: '2.5%',
    holdersChange: '0.8%',
    transactions: 1200,
    transactionsChange: '3.0%',
    liquidity: 150000,
    liquidityChange: '1.5%',
    links: {
      website: 'https://aftermath.finance',
      twitter: 'https://twitter.com/AftermathFi',
      discord: 'https://discord.gg/aftermath',
      contract: 'https://explorer.sui.io/token/aft',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/aftermath'
    }
  },
  {
    name: 'Cetus',
    symbol: 'CET',
    address: '0x8::cetus::CET',
    price: '0.95',
    scores: generateScores(92, 88, 82),
    priceChange24h: 3.8,
    marketCap: 180000000,
    volume24h: 12000000,
    totalSupply: 1500000000,
    holders: 85000,
    icon: '/cetus-logo.png',
    description: 'Cetus is a leading AMM and liquidity provider on Sui.',
    llmSummary: 'Cetus maintains dominant position in AMM space with growing liquidity.',
    valueProp: 'Advanced AMM with concentrated liquidity and multi-token pools.',
    marketCapChange: '0.8%',
    volumeChange24h: '1.8%',
    holdersChange: '0.5%',
    transactions: 1500,
    transactionsChange: '2.5%',
    liquidity: 200000,
    liquidityChange: '1.2%',
    links: {
      website: 'https://cetus.zone',
      twitter: 'https://twitter.com/CetusProtocol',
      discord: 'https://discord.gg/cetus',
      contract: 'https://explorer.sui.io/token/cet',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/cetus'
    }
  },
  {
    name: 'Bucket',
    symbol: 'BKT',
    address: '0x10::bucket::BKT',
    price: '0.75',
    scores: generateScores(78, 72, 75),
    priceChange24h: -1.5,
    marketCap: 90000000,
    volume24h: 4000000,
    totalSupply: 800000000,
    holders: 45000,
    icon: '/bucket-logo.png',
    description: 'Bucket Protocol provides stablecoin and synthetic asset solutions on Sui.',
    llmSummary: 'Bucket shows steady growth in stablecoin adoption and synthetic assets.',
    valueProp: 'Innovative stablecoin protocol with multi-collateral support.',
    marketCapChange: '0.3%',
    volumeChange24h: '0.9%',
    holdersChange: '0.2%',
    transactions: 600,
    transactionsChange: '1.2%',
    liquidity: 60000,
    liquidityChange: '0.6%',
    links: {
      website: 'https://bucket.finance',
      twitter: 'https://twitter.com/BucketProtocol',
      discord: 'https://discord.gg/bucket',
      contract: 'https://explorer.sui.io/token/bkt',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/bucket'
    }
  }
];
