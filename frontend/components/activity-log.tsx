"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, Server, Shield, HardDrive, UserPlus, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react"

// Mock data for activity logs by server
const serverActivities = {
  "prod-server-01": [
    {
      id: 1,
      type: "security",
      message: "Blocked suspicious login attempt",
      timestamp: "10 minutes ago",
      server: "prod-server-01",
      severity: "warning",
    },
    {
      id: 4,
      type: "disk",
      message: "Low disk space warning",
      timestamp: "5 hours ago",
      server: "prod-server-01",
      severity: "warning",
    },
    {
      id: 7,
      type: "system",
      message: "Automatic backup completed",
      timestamp: "12 hours ago",
      server: "prod-server-01",
      severity: "success",
    },
  ],
  "dev-server-02": [
    {
      id: 2,
      type: "system",
      message: "Automatic system update completed",
      timestamp: "1 hour ago",
      server: "dev-server-02",
      severity: "info",
    },
    {
      id: 5,
      type: "system",
      message: "Service restarted successfully",
      timestamp: "8 hours ago",
      server: "dev-server-02",
      severity: "success",
    },
    {
      id: 8,
      type: "user",
      message: "Developer access granted",
      timestamp: "1 day ago",
      server: "dev-server-02",
      severity: "info",
    },
  ],
  "staging-server-01": [
    {
      id: 3,
      type: "user",
      message: "New user account created",
      timestamp: "3 hours ago",
      server: "staging-server-01",
      severity: "info",
    },
    {
      id: 6,
      type: "system",
      message: "High CPU usage detected",
      timestamp: "9 hours ago",
      server: "staging-server-01",
      severity: "warning",
    },
    {
      id: 9,
      type: "security",
      message: "Security patch applied",
      timestamp: "2 days ago",
      server: "staging-server-01",
      severity: "success",
    },
  ],
}

// Default activities to show when no server is selected
const defaultActivities = [
  {
    id: 1,
    type: "security",
    message: "Blocked suspicious login attempt",
    timestamp: "10 minutes ago",
    server: "prod-server-01",
    severity: "warning",
  },
  {
    id: 2,
    type: "system",
    message: "Automatic system update completed",
    timestamp: "1 hour ago",
    server: "dev-server-02",
    severity: "info",
  },
  {
    id: 3,
    type: "user",
    message: "New user account created",
    timestamp: "3 hours ago",
    server: "staging-server-01",
    severity: "info",
  },
  {
    id: 4,
    type: "disk",
    message: "Low disk space warning",
    timestamp: "5 hours ago",
    server: "prod-server-01",
    severity: "warning",
  },
  {
    id: 5,
    type: "system",
    message: "Service restarted successfully",
    timestamp: "8 hours ago",
    server: "dev-server-02",
    severity: "success",
  },
]

interface ActivityLogProps {
  selectedServer?: string
}

export default function ActivityLog({ selectedServer }: ActivityLogProps) {
  const [activities, setActivities] = useState(defaultActivities)

  // Update activities when selected server changes
  useEffect(() => {
    if (selectedServer && serverActivities[selectedServer]) {
      setActivities(serverActivities[selectedServer])
    } else {
      setActivities(defaultActivities)
    }
  }, [selectedServer])

  // Function to get the appropriate icon based on activity type
  const getActivityIcon = (type: string, severity: string) => {
    switch (type) {
      case "security":
        return <Shield className={`h-3.5 w-3.5 ${severity === "warning" ? "text-amber-400" : "text-blue-400"}`} />
      case "system":
        return <RefreshCw className={`h-3.5 w-3.5 ${severity === "warning" ? "text-amber-400" : "text-green-400"}`} />
      case "user":
        return <UserPlus className="h-3.5 w-3.5 text-blue-400" />
      case "disk":
        return <HardDrive className="h-3.5 w-3.5 text-amber-400" />
      default:
        return <Server className="h-3.5 w-3.5 text-slate-400" />
    }
  }

  return (
    <div className="space-y-3 text-white">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-blue-400" />
          Recent Activity {selectedServer && `- ${selectedServer}`}
        </h3>
        <Badge variant="outline" className="text-xs bg-slate-800 hover:bg-slate-800 text-white border-white/30">
          Last 24h
        </Badge>
      </div>

      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-md bg-slate-800/50 p-2 text-sm border border-white/20">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">{getActivityIcon(activity.type, activity.severity)}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{activity.message}</div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Server className="h-3 w-3" />
                    <span>{activity.server}</span>
                  </div>
                  <div>{activity.timestamp}</div>
                </div>
              </div>
              {activity.severity === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
              {activity.severity === "success" && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
