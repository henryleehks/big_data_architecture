import { NextResponse } from 'next/server'
import { getSolanaBlocksPreview } from '@/app/lib/clickhouse'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const data = await getSolanaBlocksPreview(550)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Solana blocks preview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Solana blocks data' },
      { status: 500 }
    )
  }
}
