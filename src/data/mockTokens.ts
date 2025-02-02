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
    holders: 100000,
    icon: '/sui-logo.png',
    description: 'The native token of the Sui blockchain',
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
    priceChange24h: -2.1,
    marketCap: 100000000,
    volume24h: 5000000,
    holders: 50000,
    icon: '/scallop-logo.png',
    description: 'The governance token of the Scallop protocol',
    links: {
      website: 'https://scallop.io',
      twitter: 'https://twitter.com/ScallopProtocol',
      explorer: 'https://explorer.sui.io/token/sca'
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
    holders: 75000,
    icon: '/aftermath-logo.png',
    description: 'The utility token of Aftermath Finance',
    links: {
      website: 'https://aftermath.finance',
      twitter: 'https://twitter.com/AftermathFi',
      explorer: 'https://explorer.sui.io/token/aft'
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
    holders: 40000,
    icon: '/suiswap-logo.png',
    description: 'The governance token of the Suiswap DEX',
    links: {
      website: 'https://suiswap.com',
      twitter: 'https://twitter.com/SuiswapDEX',
      explorer: 'https://explorer.sui.io/token/swap'
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
    holders: 60000,
    icon: '/cetus-logo.png',
    description: 'The utility token of the Cetus protocol',
    links: {
      website: 'https://cetus.io',
      twitter: 'https://twitter.com/CetusProtocol',
      explorer: 'https://explorer.sui.io/token/cet'
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
    holders: 80000,
    icon: '/turbos-logo.png',
    description: 'The governance token of Turbos Finance',
    links: {
      website: 'https://turbos.finance',
      twitter: 'https://twitter.com/TurbosFi',
      explorer: 'https://explorer.sui.io/token/turbos'
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
    holders: 45000,
    icon: '/bucket-logo.png',
    description: 'The utility token of Bucket Protocol',
    links: {
      website: 'https://bucket.fi',
      twitter: 'https://twitter.com/BucketProtocol',
      explorer: 'https://explorer.sui.io/token/bkt'
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
    holders: 55000,
    icon: '/navi-logo.png',
    description: 'The governance token of Navi Protocol',
    links: {
      website: 'https://navi.xyz',
      twitter: 'https://twitter.com/NaviProtocol',
      explorer: 'https://explorer.sui.io/token/navi'
    }
  }
];
