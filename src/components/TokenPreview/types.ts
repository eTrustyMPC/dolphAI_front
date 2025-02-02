export interface Token {
  name: string;
  symbol: string;
  address: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  logo?: string;
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
