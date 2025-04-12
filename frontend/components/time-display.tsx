"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"

export function TimeDisplay() {
  const [time, setTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString())
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="text-xs text-slate-400 flex items-center gap-1">
        <RefreshCw className="h-3 w-3" />
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="text-xs text-slate-400 flex items-center gap-1">
      <RefreshCw className="h-3 w-3" />
      <span>{time}</span>
    </div>
  )
}
