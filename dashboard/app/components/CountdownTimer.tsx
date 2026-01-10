'use client'

import { useState, useEffect } from 'react'
import { formatTime, getTimerColor } from '@/app/lib/utils'

interface CountdownTimerProps {
  startedAt: string | null
  isRunning: boolean
  maxMinutes: number
}

export default function CountdownTimer({
  startedAt,
  isRunning,
  maxMinutes,
}: CountdownTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(maxMinutes * 60)

  // Validate timestamp is fresh and not stale
  const isValidStartTime = (timestamp: string | null): boolean => {
    if (!timestamp) return false
    // Normalize timestamp: replace space with 'T' for ISO 8601 format
    const normalized = timestamp.replace(' ', 'T')
    const started = new Date(normalized).getTime()
    const now = Date.now()
    const elapsed = (now - started) / 1000
    // Validate timestamp is recent and not in future
    return elapsed >= 0 && elapsed < maxMinutes * 60
  }

  useEffect(() => {
    if (!startedAt || !isRunning) {
      setSecondsRemaining(maxMinutes * 60)
      return
    }

    const calculateRemaining = () => {
      if (!isValidStartTime(startedAt)) {
        return maxMinutes * 60 // Return max time if invalid
      }

      // Normalize timestamp: replace space with 'T' for ISO 8601 format
      const normalizedTimestamp = startedAt.replace(' ', 'T')
      const started = new Date(normalizedTimestamp).getTime()
      const now = Date.now()
      const elapsed = Math.floor((now - started) / 1000)
      const total = maxMinutes * 60
      return Math.max(0, total - elapsed)
    }

    setSecondsRemaining(calculateRemaining())

    const interval = setInterval(() => {
      const remaining = calculateRemaining()
      setSecondsRemaining(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startedAt, isRunning, maxMinutes])

  const colorClass = getTimerColor(secondsRemaining)

  if (!isRunning || !startedAt) {
    return (
      <div className="text-center">
        <div className="text-4xl font-mono font-bold text-gray-400">--:--</div>
        <div className="text-sm text-gray-500 mt-1">Time Remaining</div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className={`text-4xl font-mono font-bold ${colorClass}`}>
        {formatTime(secondsRemaining)}
      </div>
      <div className="text-sm text-gray-500 mt-1">Time Remaining</div>
    </div>
  )
}
