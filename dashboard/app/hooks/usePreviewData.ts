import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useBitcoinBlocksPreview() {
  const { data, error, isLoading } = useSWR('/api/preview/bitcoin-blocks', fetcher, {
    refreshInterval: 10000, // Refresh every 10 seconds
  })

  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useBitcoinTransactionsPreview() {
  const { data, error, isLoading } = useSWR('/api/preview/bitcoin-transactions', fetcher, {
    refreshInterval: 10000,
  })

  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useSolanaBlocksPreview() {
  const { data, error, isLoading } = useSWR('/api/preview/solana-blocks', fetcher, {
    refreshInterval: 10000,
  })

  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useSolanaTransactionsPreview() {
  const { data, error, isLoading } = useSWR('/api/preview/solana-transactions', fetcher, {
    refreshInterval: 10000,
  })

  return {
    data,
    isLoading,
    isError: error,
  }
}
