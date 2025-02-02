export type Token = {
  id: string
  name: string
  symbol: string
  price: number
  icon: string
  marketCap?: number
  volume24h?: number
}

export type TokenMetrics = {
  liquidity: number
  volume: number
  priceChange24h: number
}

export type TokenActionProps = {
  tokenId: string
  onBuy?: () => void
  onSell?: () => void
}
