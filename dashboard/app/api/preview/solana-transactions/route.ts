import { NextResponse } from 'next/server'
import { getSolanaTransactionsPreview } from '@/app/lib/clickhouse'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const data = await getSolanaTransactionsPreview(550)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Solana transactions preview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Solana transactions data' },
      { status: 500 }
    )
  }
}
