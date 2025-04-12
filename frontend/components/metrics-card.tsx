"use client"

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import type { ReactNode } from "react"

interface MetricsCardProps {
  title: string
  value: string
  trend: string
  status: "normal" | "warning" | "critical"
  icon?: ReactNode
}

export default function MetricsCard({ title, value, trend, status, icon }: MetricsCardProps) {
  const isPositive = trend.startsWith("+")

  return (
    <div className="rounded-lg border border-white/30 bg-slate-900 p-3">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            {icon}
            {title}
          </div>
          <div
            className={`flex items-center text-xs ${
              status === "normal" ? "text-green-500" : status === "warning" ? "text-amber-500" : "text-red-500"
            }`}
          >
            {isPositive ? <ArrowUpIcon className="mr-0.5 h-3 w-3" /> : <ArrowDownIcon className="mr-0.5 h-3 w-3" />}
            {trend}
          </div>
        </div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>

      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden border border-white/10">
        <div
          className={`h-full ${
            status === "normal" ? "bg-green-500" : status === "warning" ? "bg-amber-500" : "bg-red-500"
          }`}
          style={{
            width: status === "normal" ? "40%" : status === "warning" ? "70%" : "90%",
          }}
        />
      </div>
    </div>
  )
}
