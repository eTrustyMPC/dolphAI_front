import { Token } from '@/components/TokenPreview/types';

// Seeded random number generator for consistent values between server and client
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Simple random number generator with seed
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

const random = new SeededRandom(42); // Using fixed seed for consistency

function generateRandomAddress(index: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const prefix = 'SUI'; // Add a consistent prefix
  const suffix = index.toString().padStart(3, '0'); // Add index as suffix
  const randomPart = Array(39).fill(0).map(() => chars[Math.floor(random.next() * chars.length)]).join('');
  return prefix + randomPart + suffix;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(random.next() * (max - min + 1)) + min;
}

const tokenNames = [
  'PEPE', 'DOGE', 'SHIB', 'FLOKI', 'BONE', 'KISHU', 'ELON', 'AKITA',
  'HOGE', 'SAMO', 'CATE', 'TAMA', 'BABYDOGE', 'MEME', 'WEN', 'WOJAK',
  'CHAD', 'BASED', 'WAGMI', 'GG', 'FOMO', 'MOON', 'PUMP', 'APE'
];

export const mockTokens: Token[] = Array(24).fill(null).map((_, index) => {
  const marketCap = generateRandomNumber(100000, 10000000);
  const volume24h = marketCap * (generateRandomNumber(1, 20) / 100); // 1-20% of market cap
  const holders = generateRandomNumber(100, 10000);
  const requestCount = generateRandomNumber(1000, 20000);
  
  return {
    name: tokenNames[index],
    address: generateRandomAddress(index),
    requestCount,
    holders,
    volume24h,
    marketCap,
    links: {
      website: `https://${tokenNames[index].toLowerCase()}.com`,
      twitter: `https://twitter.com/${tokenNames[index].toLowerCase()}_official`,
      explorer: `https://explorer.sui.io/token/${tokenNames[index].toLowerCase()}`
    }
  };
});
