import { NextResponse } from 'next/server'
import { getBitcoinBlocksPreview } from '@/app/lib/clickhouse'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const data = await getBitcoinBlocksPreview(550)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Bitcoin blocks preview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Bitcoin blocks data' },
      { status: 500 }
    )
  }
}
