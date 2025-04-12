"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

export function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <button
      className="rounded-md bg-slate-800 p-1.5 hover:bg-slate-700"
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
    </button>
  )
}
