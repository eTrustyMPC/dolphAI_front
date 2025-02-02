export interface Token {
  name: string;
  address: string;
  symbol: string;
  description?: string;
  price: string;
  icon?: string;
  priceChange24h?: number;
  marketCap?: number;
  volume24h?: number;
  holders?: number;
  links?: {
    website?: string;
    twitter?: string;
    explorer?: string;
  };
}

export interface TokenMetrics {
  holders: number;
  volume: number;
  marketCap: number;
  liquidity: number;
  priceChange24h: number;
}

export interface TokenActionProps {
  tokenId: string;
  onBuy?: () => void;
  onSell?: () => void;
}
