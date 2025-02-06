import { TokenCardData } from '@/components/TokenCard/types';

// Generate mock tokens with realistic data
export const mockTokens: TokenCardData[] = [
  {
    name: 'Sui',
    symbol: 'SUI',
    address: '0x2::sui::SUI',
    price: '1.25',
    priceChange24h: 5.2,
    marketCap: 500000000,
    volume24h: 15000000,
    totalSupply: 10000000000,
    holders: 100000,
    icon: '/sui-logo.png',
    description: 'The native token of the Sui blockchain platform, used for gas fees and staking.',
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
    },
    defiPools: [
      {
        projectName: 'Cetus',
        platformLink: 'https://cetus.zone',
        pool: 'SUI-USDC',
        tvl: 25000000,
        apy: 12.5
      },
      {
        projectName: 'Aftermath',
        platformLink: 'https://aftermath.finance',
        pool: 'SUI-USDT',
        tvl: 18000000,
        apy: 15.2
      }
    ],
    llmSummary: 'Sui (SUI) demonstrates strong network growth with increasing adoption metrics. Recent protocol upgrades and partnerships suggest positive momentum.',
    valueProp: 'Sui is a Layer 1 blockchain that redefines asset ownership and empowers creators and developers with unmatched scalability.',
    dynamics: {
      weeklyActiveUsers: 125000,
      weeklyTxCount: 850000,
      weeklyVolumeChange: 15.3,
      weeklyHolderChange: 8.2,
      topHoldersConcentration: 45.5
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        message: 'Significant holder distribution change detected',
        type: 'warning'
      },
      {
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        message: 'New contract interaction pattern identified',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Sui Network Announces Major Protocol Upgrade',
        url: 'https://sui.io/blog/protocol-upgrade'
      },
      {
        title: 'New Partnerships Drive Sui Ecosystem Growth',
        url: 'https://sui.io/blog/ecosystem-growth'
      }
    ],
    links: {
      website: 'https://sui.io',
      twitter: 'https://twitter.com/SuiNetwork',
      discord: 'https://discord.gg/sui',
      contract: 'https://explorer.sui.io/token/sui',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/sui'
    },
    marketCapChange: '0.5%',
    volumeChange24h: '1.2%',
    holdersChange: '0.3%',
    transactions: 1000,
    transactionsChange: '2.0%',
    liquidity: 100000,
    liquidityChange: '1.0%',
  },
  {
    name: 'Scallop',
    symbol: 'SCA',
    address: '0x5::scallop::SCA',
    price: '0.85',
    priceChange24h: -2.1,
    marketCap: 100000000,
    volume24h: 5000000,
    totalSupply: 1000000000,
    holders: 50000,
    icon: '/scallop-logo.png',
    description: 'The governance token of the Scallop protocol, used for voting and staking.',
    llmSummary: 'Scallop (SCA) shows promising growth in its DeFi lending protocol, with increasing adoption and TVL.',
    valueProp: 'Scallop revolutionizes DeFi lending with its unique risk management and liquidation system.',
    dynamics: {
      weeklyActiveUsers: 80000,
      weeklyTxCount: 400000,
      weeklyVolumeChange: 10.5,
      weeklyHolderChange: 5.1,
      topHoldersConcentration: 38.2
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        message: 'New lending market launched',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        message: 'Protocol upgrade proposal passed',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Scallop Introduces New Lending Markets',
        url: 'https://scallop.io/blog/new-markets'
      }
    ],
    links: {
      website: 'https://scallop.io',
      twitter: 'https://twitter.com/ScallopProtocol',
      discord: 'https://discord.gg/scallop',
      contract: 'https://explorer.sui.io/token/sca',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/scallop'
    },
    marketCapChange: '0.4%',
    volumeChange24h: '1.0%',
    holdersChange: '0.2%',
    transactions: 800,
    transactionsChange: '1.5%',
    liquidity: 80000,
    liquidityChange: '0.8%',
  },
  {
    name: 'Aftermath',
    symbol: 'AFT',
    address: '0x6::aftermath::AFT',
    price: '2.15',
    scores: {
      onChainActivity: {
        value: 82,
        explanation: 'Strong daily active addresses and growing transaction volume'
      },
      liquidityAndTrading: {
        value: 75,
        explanation: 'Deep liquidity pools with consistent trading activity'
      },
      whalesAndHolders: {
        value: 68,
        explanation: 'Balanced distribution between retail and institutional holders'
      }
    },
    priceChange24h: 8.5,
    marketCap: 150000000,
    volume24h: 8000000,
    totalSupply: 500000000,
    holders: 75000,
    icon: '/aftermath-logo.png',
    description: 'The utility token of Aftermath Finance, used for trading and staking.',
    llmSummary: 'Aftermath (AFT) has seen significant growth in its trading volume and TVL.',
    valueProp: 'Aftermath Finance brings institutional-grade perpetual trading to DeFi.',
    dynamics: {
      weeklyActiveUsers: 120000,
      weeklyTxCount: 600000,
      weeklyVolumeChange: 18.2,
      weeklyHolderChange: 9.5,
      topHoldersConcentration: 42.1
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        message: 'Trading volume hits new ATH',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        message: 'New trading pairs added',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Aftermath Finance Sets New Volume Records',
        url: 'https://aftermath.finance/blog/volume-records'
      }
    ],
    links: {
      website: 'https://aftermath.finance',
      twitter: 'https://twitter.com/AftermathFi',
      discord: 'https://discord.gg/aftermath',
      contract: 'https://explorer.sui.io/token/aft',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/aftermath'
    },
    marketCapChange: '0.6%',
    volumeChange24h: '1.3%',
    holdersChange: '0.4%',
    transactions: 1200,
    transactionsChange: '2.5%',
    liquidity: 120000,
    liquidityChange: '1.2%',
  },
  {
    name: 'Suiswap',
    symbol: 'SWAP',
    address: '0x7::suiswap::SWAP',
    price: '1.45',
    priceChange24h: -1.8,
    marketCap: 80000000,
    volume24h: 4000000,
    totalSupply: 1000000000,
    holders: 40000,
    icon: '/suiswap-logo.png',
    description: 'The governance token of the Suiswap DEX, used for voting and staking.',
    llmSummary: 'Suiswap (SWAP) has seen steady growth in its trading volume and TVL.',
    valueProp: 'Suiswap provides a seamless trading experience with low fees.',
    dynamics: {
      weeklyActiveUsers: 90000,
      weeklyTxCount: 500000,
      weeklyVolumeChange: 12.1,
      weeklyHolderChange: 6.3,
      topHoldersConcentration: 40.5
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        message: 'New liquidity pool launched',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        message: 'Trading volume increased by 15%',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Suiswap Introduces New Liquidity Pools',
        url: 'https://suiswap.com/blog/new-pools'
      }
    ],
    links: {
      website: 'https://suiswap.com',
      twitter: 'https://twitter.com/SuiswapDEX',
      discord: 'https://discord.gg/suiswap',
      contract: 'https://explorer.sui.io/token/swap',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/suiswap'
    },
    marketCapChange: '0.3%',
    volumeChange24h: '0.9%',
    holdersChange: '0.2%',
    transactions: 600,
    transactionsChange: '1.1%',
    liquidity: 60000,
    liquidityChange: '0.7%',
  },
  {
    name: 'Cetus',
    symbol: 'CET',
    address: '0x8::cetus::CET',
    price: '0.95',
    scores: {
      onChainActivity: {
        value: 88,
        explanation: 'High transaction count and active smart contract interactions'
      },
      liquidityAndTrading: {
        value: 85,
        explanation: 'Market leading liquidity provider with high trading volumes'
      },
      whalesAndHolders: {
        value: 78,
        explanation: 'Well-distributed token holdings with strong institutional presence'
      }
    },
    priceChange24h: 3.2,
    marketCap: 120000000,
    volume24h: 6000000,
    totalSupply: 500000000,
    holders: 60000,
    icon: '/cetus-logo.png',
    description: 'The utility token of the Cetus protocol, used for yield farming and staking.',
    llmSummary: 'Cetus (CET) has seen significant growth in its yield farming and TVL.',
    valueProp: 'Cetus provides innovative yield farming mechanisms.',
    dynamics: {
      weeklyActiveUsers: 100000,
      weeklyTxCount: 550000,
      weeklyVolumeChange: 14.5,
      weeklyHolderChange: 7.2,
      topHoldersConcentration: 43.8
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        message: 'New yield farm launched',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        message: 'APY increased across pools',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Cetus Introduces New Yield Farms',
        url: 'https://cetus.io/blog/new-farms'
      }
    ],
    links: {
      website: 'https://cetus.io',
      twitter: 'https://twitter.com/CetusProtocol',
      discord: 'https://discord.gg/cetus',
      contract: 'https://explorer.sui.io/token/cet',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/cetus'
    },
    marketCapChange: '0.5%',
    volumeChange24h: '1.1%',
    holdersChange: '0.3%',
    transactions: 900,
    transactionsChange: '1.8%',
    liquidity: 90000,
    liquidityChange: '0.9%',
  },
  {
    name: 'Turbos',
    symbol: 'TURBOS',
    address: '0x9::turbos::TURBOS',
    price: '3.25',
    priceChange24h: 12.5,
    marketCap: 200000000,
    volume24h: 10000000,
    totalSupply: 1000000000,
    holders: 80000,
    icon: '/turbos-logo.png',
    description: 'The governance token of Turbos Finance, used for voting and staking.',
    llmSummary: 'Turbos (TURBOS) has seen significant growth in its turbocharging mechanisms and TVL.',
    valueProp: 'Turbos provides high-performance DeFi trading with innovative mechanisms.',
    dynamics: {
      weeklyActiveUsers: 110000,
      weeklyTxCount: 600000,
      weeklyVolumeChange: 16.8,
      weeklyHolderChange: 8.5,
      topHoldersConcentration: 46.2
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        message: 'New turbocharging mechanism launched',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
        message: 'Platform upgrade completed',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Turbos Introduces New Trading Features',
        url: 'https://turbos.finance/blog/new-features'
      }
    ],
    links: {
      website: 'https://turbos.finance',
      twitter: 'https://twitter.com/TurbosFi',
      discord: 'https://discord.gg/turbos',
      contract: 'https://explorer.sui.io/token/turbos',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/turbos'
    },
    marketCapChange: '0.8%',
    volumeChange24h: '1.5%',
    holdersChange: '0.5%',
    transactions: 1500,
    transactionsChange: '2.8%',
    liquidity: 150000,
    liquidityChange: '1.4%',
  },
  {
    name: 'Bucket',
    symbol: 'BKT',
    address: '0x10::bucket::BKT',
    price: '0.75',
    scores: {
      onChainActivity: {
        value: 76,
        explanation: 'Growing daily active addresses with steady transaction growth'
      },
      liquidityAndTrading: {
        value: 72,
        explanation: 'Adequate liquidity across major DEXes with moderate volume'
      },
      whalesAndHolders: {
        value: 70,
        explanation: 'Healthy mix of retail and institutional holders'
      }
    },
    priceChange24h: -4.2,
    marketCap: 90000000,
    volume24h: 3000000,
    totalSupply: 500000000,
    holders: 45000,
    icon: '/bucket-logo.png',
    description: 'The utility token of Bucket Protocol, used for bucketing and staking.',
    llmSummary: 'Bucket (BKT) has shown steady growth in its liquidity provision mechanisms.',
    valueProp: 'Bucket Protocol simplifies DeFi liquidity provision.',
    dynamics: {
      weeklyActiveUsers: 90000,
      weeklyTxCount: 450000,
      weeklyVolumeChange: 11.9,
      weeklyHolderChange: 6.1,
      topHoldersConcentration: 41.9
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
        message: 'New liquidity pools added',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
        message: 'Protocol upgrade completed',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Bucket Expands Liquidity Options',
        url: 'https://bucket.fi/blog/expansion'
      }
    ],
    links: {
      website: 'https://bucket.fi',
      twitter: 'https://twitter.com/BucketProtocol',
      discord: 'https://discord.gg/bucket',
      contract: 'https://explorer.sui.io/token/bkt',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/bucket'
    },
    marketCapChange: '0.2%',
    volumeChange24h: '0.8%',
    holdersChange: '0.1%',
    transactions: 500,
    transactionsChange: '1.0%',
    liquidity: 50000,
    liquidityChange: '0.6%',
  },
  {
    name: 'Navi',
    symbol: 'NAVI',
    address: '0x11::navi::NAVI',
    price: '1.85',
    priceChange24h: 6.8,
    marketCap: 110000000,
    volume24h: 7000000,
    totalSupply: 1000000000,
    holders: 55000,
    icon: '/navi-logo.png',
    description: 'The governance token of Navi Protocol, used for navigation and staking.',
    llmSummary: 'Navi (NAVI) demonstrates strong growth in DeFi navigation solutions.',
    valueProp: 'Navi Protocol streamlines DeFi navigation and discovery.',
    dynamics: {
      weeklyActiveUsers: 100000,
      weeklyTxCount: 500000,
      weeklyVolumeChange: 13.4,
      weeklyHolderChange: 7.1,
      topHoldersConcentration: 44.5
    },
    recentUpdates: [
      {
        timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        message: 'New navigation features released',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
        message: 'Community governance launched',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Navi Revolutionizes DeFi Navigation',
        url: 'https://navi.xyz/blog/revolution'
      }
    ],
    links: {
      website: 'https://navi.xyz',
      twitter: 'https://twitter.com/NaviProtocol',
      discord: 'https://discord.gg/navi',
      contract: 'https://explorer.sui.io/token/navi',
      explorer: 'https://explorer.sui.io',
      telegram: 'https://t.me/navi'
    },
    marketCapChange: '0.4%',
    volumeChange24h: '1.2%',
    holdersChange: '0.3%',
    transactions: 700,
    transactionsChange: '1.6%',
    liquidity: 70000,
    liquidityChange: '0.8%',
  }
];
