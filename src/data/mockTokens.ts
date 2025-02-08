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
    name: 'Bluefin',
    symbol: 'BFN',
    address: '0x1::bluefin::BFN',
    price: '4.20',
    scores: generateScores(90, 85, 88),
    priceChange24h: 15.3,
    marketCap: 280000000,
    volume24h: 18000000,
    totalSupply: 1000000000,
    holders: 95000,
    icon: 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/BFN.svg',
    description: 'Advanced DEX platform with innovative trading features.',
    marketCapChange: '+18.5%',
    volumeChange24h: '+12.3%',
    dynamics: {
      weeklyActiveUsers: 125000,
      weeklyTxCount: 2200,
      weeklyVolumeChange: 12.3,
      weeklyHolderChange: 3.1,
      topHoldersConcentration: 45.2
    },
    links: {
      website: 'https://bluefin.io',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/bluefinprotocol',
      whitepaper: 'https://bluefin.io/whitepaper'
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
    icon: '/sui-logo.png',
    description: 'The native token of the Sui blockchain platform.',
    dynamics: {
      weeklyActiveUsers: 100000,
      weeklyTxCount: 2200,
      weeklyVolumeChange: 6.2,
      weeklyHolderChange: 1.8,
      topHoldersConcentration: 42.5
    },
    links: {
      website: 'https://sui.io',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/sui_network',
      whitepaper: 'https://sui.io/whitepaper'
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
    marketCapChange: '-3.2%',
    volumeChange24h: '-1.8%',
    dynamics: {
      weeklyActiveUsers: 80000,
      weeklyTxCount: 1800,
      weeklyVolumeChange: -1.8,
      weeklyHolderChange: 1.2,
      topHoldersConcentration: 38.5
    },
    links: {
      website: 'https://scallop.io',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/scallopprotocol',
      whitepaper: 'https://scallop.io/whitepaper'
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
    marketCapChange: '+11.2%',
    volumeChange24h: '+6.8%',
    dynamics: {
      weeklyActiveUsers: 95000,
      weeklyTxCount: 1500,
      weeklyVolumeChange: 6.8,
      weeklyHolderChange: 2.5,
      topHoldersConcentration: 41.8
    },
    links: {
      website: 'https://aftermath.finance',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/aftermathfi',
      whitepaper: 'https://aftermath.finance/whitepaper'
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
    marketCapChange: '+9.5%',
    volumeChange24h: '+5.8%',
    dynamics: {
      weeklyActiveUsers: 85000,
      weeklyTxCount: 1300,
      weeklyVolumeChange: 5.8,
      weeklyHolderChange: 2.2,
      topHoldersConcentration: 40.5
    },
    links: {
      website: 'https://turbos.finance',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/turbosfinance',
      whitepaper: 'https://turbos.finance/whitepaper'
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
    marketCapChange: '-2.5%',
    volumeChange24h: '-1.5%',
    dynamics: {
      weeklyActiveUsers: 75000,
      weeklyTxCount: 1100,
      weeklyVolumeChange: -1.5,
      weeklyHolderChange: 0.8,
      topHoldersConcentration: 37.2
    },
    links: {
      website: 'https://bucket.fi',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/bucketprotocol',
      whitepaper: 'https://bucket.fi/whitepaper'
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
    marketCapChange: '+6.8%',
    volumeChange24h: '+4.2%',
    dynamics: {
      weeklyActiveUsers: 70000,
      weeklyTxCount: 900,
      weeklyVolumeChange: 4.2,
      weeklyHolderChange: 1.5,
      topHoldersConcentration: 36.8
    },
    links: {
      website: 'https://navi.xyz',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/naviprotocol',
      whitepaper: 'https://navi.xyz/whitepaper'
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
    marketCapChange: '+4.2%',
    volumeChange24h: '+3.1%',
    dynamics: {
      weeklyActiveUsers: 65000,
      weeklyTxCount: 800,
      weeklyVolumeChange: 3.1,
      weeklyHolderChange: 1.2,
      topHoldersConcentration: 35.5
    },
    links: {
      website: 'https://kriya.finance',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/kriyafinance',
      whitepaper: 'https://kriya.finance/whitepaper'
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
    marketCapChange: '-1.8%',
    volumeChange24h: '-1.2%',
    dynamics: {
      weeklyActiveUsers: 60000,
      weeklyTxCount: 700,
      weeklyVolumeChange: -1.2,
      weeklyHolderChange: 0.5,
      topHoldersConcentration: 34.2
    },
    links: {
      website: 'https://suia.io',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/suiaprotocol',
      whitepaper: 'https://suia.io/whitepaper'
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
    marketCapChange: '+2.8%',
    volumeChange24h: '+1.9%',
    dynamics: {
      weeklyActiveUsers: 55000,
      weeklyTxCount: 600,
      weeklyVolumeChange: 1.9,
      weeklyHolderChange: 0.8,
      topHoldersConcentration: 33.5
    },
    links: {
      website: 'https://movex.exchange',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/movexprotocol',
      whitepaper: 'https://movex.exchange/whitepaper'
    }
  }
];
