export interface Token {
  name: string;
  address: string;
  requestCount: number;
  holders: number;
  volume24h: number;
  marketCap: number;
  links: {
    website: string;
    twitter: string;
    explorer: string;
  };
  symbol?: string;
  price?: number;
  icon?: string;
}

export interface TokenMetrics {
  liquidity: number;
  volume: number;
  priceChange24h: number;
}

export interface TokenActionProps {
  tokenId: string;
  onBuy?: () => void;
  onSell?: () => void;
}
