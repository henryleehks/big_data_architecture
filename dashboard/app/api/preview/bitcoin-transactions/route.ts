import { NextResponse } from 'next/server'
import { getBitcoinTransactionsPreview } from '@/app/lib/clickhouse'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const data = await getBitcoinTransactionsPreview(550)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Bitcoin transactions preview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Bitcoin transactions data' },
      { status: 500 }
    )
  }
}
