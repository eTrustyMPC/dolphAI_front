import { Token } from '@/components/TokenPreview/types';

// Generate mock tokens with realistic data
export const mockTokens: Token[] = [
  {
    name: 'SUI',
    symbol: 'SUI',
    address: '0x2::sui::SUI',
    price: 1.25,
    priceChange24h: 5.2,
    marketCap: 500000000,
    volume24h: 15000000,
    holders: 50000,
    logo: '/sui-logo.png'
  },
  {
    name: 'CETUS',
    symbol: 'CETUS',
    address: '0x1::cetus::CETUS',
    price: 0.85,
    priceChange24h: 3.7,
    marketCap: 250000000,
    volume24h: 8000000,
    holders: 25000,
    logo: '/cetus-logo.png'
  },
  {
    name: 'SUIPAD',
    symbol: 'SPAD',
    address: '0x3::suipad::SPAD',
    price: 0.45,
    priceChange24h: -2.1,
    marketCap: 100000000,
    volume24h: 5000000,
    holders: 15000,
    logo: '/suipad-logo.png'
  },
  {
    name: 'TURBOS',
    symbol: 'TURBOS',
    address: '0x4::turbos::TURBOS',
    price: 2.15,
    priceChange24h: 8.4,
    marketCap: 750000000,
    volume24h: 25000000,
    holders: 75000,
    logo: '/turbos-logo.png'
  },
  {
    name: 'NAVI',
    symbol: 'NAVI',
    address: '0x5::navi::NAVI',
    price: 0.95,
    priceChange24h: -1.8,
    marketCap: 300000000,
    volume24h: 12000000,
    holders: 35000,
    logo: '/navi-logo.png'
  },
  {
    name: 'SUIA',
    symbol: 'SUIA',
    address: '0x6::suia::SUIA',
    price: 1.75,
    priceChange24h: 6.3,
    marketCap: 450000000,
    volume24h: 18000000,
    holders: 45000,
    logo: '/suia-logo.png'
  },
  {
    name: 'KRIYA',
    symbol: 'KRI',
    address: '0x7::kriya::KRI',
    price: 0.65,
    priceChange24h: 4.2,
    marketCap: 200000000,
    volume24h: 9000000,
    holders: 20000,
    logo: '/kriya-logo.png'
  },
  {
    name: 'BUCKET',
    symbol: 'BKT',
    address: '0x8::bucket::BKT',
    price: 1.05,
    priceChange24h: -3.5,
    marketCap: 350000000,
    volume24h: 14000000,
    holders: 40000,
    logo: '/bucket-logo.png'
  }
];
