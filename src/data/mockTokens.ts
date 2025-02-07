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
  // Mock data with all required fields
  {
    name: 'Cetus',
    symbol: 'CETUS',
    address: '0x1::cetus::CETUS',
    price: '3.45',
    scores: generateScores(92, 88, 85),
    priceChange24h: 12.5,
    marketCap: 300000000,
    volume24h: 20000000,
    totalSupply: 1500000000,
    holders: 120000,
    icon: 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/CETUS.svg',
    description: 'Leading AMM DEX on Sui Network with concentrated liquidity.',
    transactions: 2500,
    marketCapChange: '+15.2%',
    volumeChange24h: '+8.5%',
    holdersChange: '+2.3%',
    transactionsChange: '+5.1%',
    liquidity: 150000000,
    liquidityChange: '+3.2%',
    links: {
      website: 'https://www.cetus.zone',
      twitter: 'https://twitter.com/CetusProtocol',
      explorer: 'https://explorer.sui.io'
    }
  },
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
    marketCapChange: '+10.5%',
    volumeChange24h: '+6.2%',
    holdersChange: '+1.8%',
    transactionsChange: '+4.2%',
    liquidity: 250000000,
    liquidityChange: '+2.8%',
    icon: '/sui-logo.png',
    description: 'The native token of the Sui blockchain platform.',
    transactions: 2200,
    links: {
      website: 'https://sui.io',
      twitter: 'https://twitter.com/SuiNetwork',
      explorer: 'https://explorer.sui.io'
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
    description: 'Lending and borrowing protocol built on Sui.',
    transactions: 1800,
    marketCapChange: '-3.2%',
    volumeChange24h: '-1.8%',
    holdersChange: '+1.2%',
    transactionsChange: '-0.8%',
    liquidity: 90000000,
    liquidityChange: '-1.5%',
    links: {
      website: 'https://scallop.io',
      twitter: 'https://twitter.com/ScallopProtocol',
      explorer: 'https://explorer.sui.io'
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
    description: 'Decentralized exchange and trading platform on Sui.',
    transactions: 1500,
    marketCapChange: '+11.2%',
    volumeChange24h: '+6.8%',
    holdersChange: '+2.5%',
    transactionsChange: '+4.2%',
    liquidity: 160000000,
    liquidityChange: '+3.8%',
    links: {
      website: 'https://aftermath.finance',
      twitter: 'https://twitter.com/AftermathFi',
      explorer: 'https://explorer.sui.io'
    }
  },
  {
    name: 'Turbos',
    symbol: 'TURBOS',
    address: '0x7::turbos::TURBOS',
    price: '1.75',
    scores: generateScores(82, 80, 75),
    priceChange24h: 6.8,
    marketCap: 150000000,
    volume24h: 7000000,
    totalSupply: 1200000000,
    holders: 65000,
    icon: '/turbos-logo.png',
    description: 'High-performance DEX aggregator on Sui.',
    transactions: 1300,
    marketCapChange: '+9.5%',
    volumeChange24h: '+5.8%',
    holdersChange: '+2.2%',
    transactionsChange: '+3.5%',
    liquidity: 130000000,
    liquidityChange: '+2.8%',
    links: {
      website: 'https://turbos.finance',
      twitter: 'https://twitter.com/TurbosFinance',
      explorer: 'https://explorer.sui.io'
    }
  },
  {
    name: 'Bucket',
    symbol: 'BKT',
    address: '0x8::bucket::BKT',
    price: '0.95',
    scores: generateScores(78, 75, 72),
    priceChange24h: -1.2,
    marketCap: 80000000,
    volume24h: 4000000,
    totalSupply: 900000000,
    holders: 45000,
    icon: '/bucket-logo.png',
    description: 'Stablecoin protocol on Sui.',
    transactions: 1100,
    marketCapChange: '-2.5%',
    volumeChange24h: '-1.5%',
    holdersChange: '+0.8%',
    transactionsChange: '-1.2%',
    liquidity: 70000000,
    liquidityChange: '-0.9%',
    links: {
      website: 'https://bucket.fi',
      twitter: 'https://twitter.com/BucketProtocol',
      explorer: 'https://explorer.sui.io'
    }
  },
  {
    name: 'Navi Protocol',
    symbol: 'NAVI',
    address: '0x9::navi::NAVI',
    price: '2.35',
    scores: generateScores(80, 78, 76),
    priceChange24h: 4.5,
    marketCap: 170000000,
    volume24h: 6000000,
    totalSupply: 1100000000,
    holders: 55000,
    icon: '/navi-logo.png',
    description: 'Cross-chain bridge and liquidity protocol.',
    transactions: 900,
    marketCapChange: '+6.8%',
    volumeChange24h: '+4.2%',
    holdersChange: '+1.5%',
    transactionsChange: '+2.8%',
    liquidity: 140000000,
    liquidityChange: '+2.1%',
    links: {
      website: 'https://navi.xyz',
      twitter: 'https://twitter.com/NaviProtocol',
      explorer: 'https://explorer.sui.io'
    }
  },
  {
    name: 'Kriya',
    symbol: 'KRI',
    address: '0x10::kriya::KRI',
    price: '1.45',
    scores: generateScores(76, 74, 72),
    priceChange24h: 2.8,
    marketCap: 120000000,
    volume24h: 5000000,
    totalSupply: 800000000,
    holders: 40000,
    icon: '/kriya-logo.png',
    description: 'Derivatives trading platform on Sui.',
    transactions: 800,
    marketCapChange: '+4.2%',
    volumeChange24h: '+3.1%',
    holdersChange: '+1.2%',
    transactionsChange: '+1.8%',
    liquidity: 100000000,
    liquidityChange: '+1.5%',
    links: {
      website: 'https://kriya.finance',
      twitter: 'https://twitter.com/KriyaFinance',
      explorer: 'https://explorer.sui.io'
    }
  },
  {
    name: 'Suia',
    symbol: 'SUIA',
    address: '0x11::suia::SUIA',
    price: '0.65',
    scores: generateScores(74, 72, 70),
    priceChange24h: -0.8,
    marketCap: 60000000,
    volume24h: 3000000,
    totalSupply: 700000000,
    holders: 35000,
    icon: '/suia-logo.png',
    description: 'NFT marketplace and creator platform.',
    transactions: 700,
    marketCapChange: '-1.8%',
    volumeChange24h: '-1.2%',
    holdersChange: '+0.5%',
    transactionsChange: '-0.9%',
    liquidity: 50000000,
    liquidityChange: '-0.6%',
    links: {
      website: 'https://suia.io',
      twitter: 'https://twitter.com/SuiaProtocol',
      explorer: 'https://explorer.sui.io'
    }
  },
  {
    name: 'MovEX',
    symbol: 'MOV',
    address: '0x12::movex::MOV',
    price: '1.85',
    scores: generateScores(72, 70, 68),
    priceChange24h: 1.5,
    marketCap: 90000000,
    volume24h: 4000000,
    totalSupply: 600000000,
    holders: 30000,
    icon: '/movex-logo.png',
    description: 'Decentralized options trading platform.',
    transactions: 600,
    marketCapChange: '+2.8%',
    volumeChange24h: '+1.9%',
    holdersChange: '+0.8%',
    transactionsChange: '+1.2%',
    liquidity: 80000000,
    liquidityChange: '+0.9%',
    links: {
      website: 'https://movex.exchange',
      twitter: 'https://twitter.com/MovExProtocol',
      explorer: 'https://explorer.sui.io'
    }
  }
];
