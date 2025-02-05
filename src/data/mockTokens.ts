import { Token } from '@/components/TokenPreview';

// Generate mock tokens with realistic data
export const mockTokens: Token[] = [
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
    llmSummary: 'Sui (SUI) demonstrates strong network growth with increasing adoption metrics. Recent protocol upgrades and partnerships suggest positive momentum. Key metrics show healthy token distribution and growing TVL, though market volatility remains a factor to watch.',
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
      },
      {
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        message: 'Trading volume increased by 25% in last 24h',
        type: 'success'
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
      contract: 'https://explorer.sui.io/token/sui'
    }
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
    llmSummary: 'Scallop (SCA) shows promising growth in its DeFi lending protocol, with increasing adoption and TVL. However, the token\'s price has been volatile, and its market capitalization remains relatively low.',
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
      contract: 'https://explorer.sui.io/token/sca'
    }
  },
  {
    name: 'Aftermath',
    symbol: 'AFT',
    address: '0x6::aftermath::AFT',
    price: '2.15',
    priceChange24h: 8.5,
    marketCap: 150000000,
    volume24h: 8000000,
    totalSupply: 500000000,
    holders: 75000,
    icon: '/aftermath-logo.png',
    description: 'The utility token of Aftermath Finance, used for trading and staking.',
    llmSummary: 'Aftermath (AFT) has seen significant growth in its trading volume and TVL, with a strong focus on institutional-grade perpetual trading. However, the token\'s price remains volatile, and its market capitalization is relatively low.',
    valueProp: 'Aftermath Finance brings institutional-grade perpetual trading to DeFi with unique liquidity mechanisms.',
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
      contract: 'https://explorer.sui.io/token/aft'
    }
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
    llmSummary: 'Suiswap (SWAP) has seen steady growth in its trading volume and TVL, with a strong focus on providing a seamless trading experience. However, the token\'s price remains relatively low, and its market capitalization is limited.',
    valueProp: 'Suiswap provides a seamless trading experience with its innovative liquidity solutions and low fees.',
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
        message: 'Trading volume increased by 15% in last 24h',
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
      contract: 'https://explorer.sui.io/token/swap'
    }
  },
  {
    name: 'Cetus',
    symbol: 'CET',
    address: '0x8::cetus::CET',
    price: '0.95',
    priceChange24h: 3.2,
    marketCap: 120000000,
    volume24h: 6000000,
    totalSupply: 500000000,
    holders: 60000,
    icon: '/cetus-logo.png',
    description: 'The utility token of the Cetus protocol, used for yield farming and staking.',
    llmSummary: 'Cetus (CET) has seen significant growth in its yield farming and TVL, with a strong focus on providing high yields. However, the token\'s price remains relatively low, and its market capitalization is limited.',
    valueProp: 'Cetus provides a unique yield farming experience with its innovative mechanisms and high yields.',
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
        message: 'Trading volume increased by 20% in last 24h',
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
      contract: 'https://explorer.sui.io/token/cet'
    }
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
    llmSummary: 'Turbos (TURBOS) has seen significant growth in its turbocharging mechanisms and TVL, with a strong focus on providing high yields. However, the token\'s price remains relatively high, and its market capitalization is limited.',
    valueProp: 'Turbos provides a unique turbocharging experience with its innovative mechanisms and high yields.',
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
        message: 'Trading volume increased by 25% in last 24h',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Turbos Introduces New Turbocharging Mechanisms',
        url: 'https://turbos.finance/blog/new-mechanisms'
      }
    ],
    links: {
      website: 'https://turbos.finance',
      twitter: 'https://twitter.com/TurbosFi',
      discord: 'https://discord.gg/turbos',
      contract: 'https://explorer.sui.io/token/turbos'
    }
  },
  {
    name: 'Bucket',
    symbol: 'BKT',
    address: '0x10::bucket::BKT',
    price: '0.75',
    priceChange24h: -4.2,
    marketCap: 90000000,
    volume24h: 3000000,
    totalSupply: 500000000,
    holders: 45000,
    icon: '/bucket-logo.png',
    description: 'The utility token of Bucket Protocol, used for bucketing and staking.',
    llmSummary: 'Bucket (BKT) has seen steady growth in its bucketing mechanisms and TVL, with a strong focus on providing high yields. However, the token\'s price remains relatively low, and its market capitalization is limited.',
    valueProp: 'Bucket provides a unique bucketing experience with its innovative mechanisms and high yields.',
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
        message: 'New bucketing mechanism launched',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
        message: 'Trading volume increased by 15% in last 24h',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Bucket Introduces New Bucketing Mechanisms',
        url: 'https://bucket.fi/blog/new-mechanisms'
      }
    ],
    links: {
      website: 'https://bucket.fi',
      twitter: 'https://twitter.com/BucketProtocol',
      discord: 'https://discord.gg/bucket',
      contract: 'https://explorer.sui.io/token/bkt'
    }
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
    llmSummary: 'Navi (NAVI) has seen significant growth in its navigation mechanisms and TVL, with a strong focus on providing high yields. However, the token\'s price remains relatively low, and its market capitalization is limited.',
    valueProp: 'Navi provides a unique navigation experience with its innovative mechanisms and high yields.',
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
        message: 'New navigation mechanism launched',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
        message: 'Trading volume increased by 20% in last 24h',
        type: 'info'
      }
    ],
    recentArticles: [
      {
        title: 'Navi Introduces New Navigation Mechanisms',
        url: 'https://navi.xyz/blog/new-mechanisms'
      }
    ],
    links: {
      website: 'https://navi.xyz',
      twitter: 'https://twitter.com/NaviProtocol',
      discord: 'https://discord.gg/navi',
      contract: 'https://explorer.sui.io/token/navi'
    }
  }
];
