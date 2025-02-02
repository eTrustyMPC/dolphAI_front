import { useEffect, useState } from 'react'
import { Token, TokenMetrics } from '@/components/TokenPreview/types'

export const useTokenData = (tokenId: string) => {
  const [metrics, setMetrics] = useState<TokenMetrics | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`/api/metrics/${tokenId}`)
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error('Error fetching token metrics:', error)
      }
    }

    fetchMetrics()
  }, [tokenId])

  return { metrics }
}
