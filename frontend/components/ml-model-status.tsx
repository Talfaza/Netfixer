"use client"

import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"

// Simplified ML models data with only two models
const mlModels = [
  {
    id: 1,
    name: "Anomaly Detection",
    status: "active",
    type: "classification",
  },
  {
    id: 2,
    name: "Troubleshooting Model",
    status: "active",
    type: "classification",
  },
]

export default function MLModelStatus() {
  return (
    <div className="space-y-3 text-white">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium flex items-center gap-1.5">
          <Brain className="h-4 w-4 text-purple-400" />
          ML Models Status
        </h3>
        <Badge variant="outline" className="text-xs bg-slate-800 hover:bg-slate-800 text-white border-white/30">
          {mlModels.filter((m) => m.status === "active").length} Active
        </Badge>
      </div>

      <div className="space-y-2">
        {mlModels.map((model) => (
          <div
            key={model.id}
            className="rounded-md bg-slate-800/50 p-2 text-sm flex items-center justify-between border border-white/20"
          >
            <div className="font-medium">{model.name}</div>
            <Badge
              className={`text-xs px-1.5 py-0 border border-white/20 ${
                model.status === "active"
                  ? "bg-green-500/20 text-green-500"
                  : model.status === "training"
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-red-500/20 text-red-500"
              }`}
            >
              {model.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
