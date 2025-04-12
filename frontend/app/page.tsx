"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServerManagement } from "@/components/server-management"
import { LogoutButton } from "@/components/logout-button"
import { TimeDisplay } from "@/components/time-display"
import { RefreshButton } from "@/components/refresh-button"
import ProcessTable from "@/components/process-table"
import MetricsCard from "@/components/metrics-card"
import LineChart from "@/components/line-chart"
import MLModelStatus from "@/components/ml-model-status"
import ActivityLog from "@/components/activity-log"
import { Footer } from "@/components/footer"
import { BarChart3, Cpu, MemoryStickIcon as Memory, HardDrive } from "lucide-react"
import { useState } from "react"

export default function Dashboard() {
  const [selectedServer, setSelectedServer] = useState<string | undefined>(undefined)

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900 px-4 py-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
              </div>
              <h1 className="text-lg font-bold">Netfixer</h1>
            </div>
            <div className="flex items-center gap-2">
              <TimeDisplay />
              <RefreshButton />
              <LogoutButton />
            </div>
          </div>

          <ServerManagement onServerSelect={setSelectedServer} />
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricsCard
            title="CPU Usage"
            value="42%"
            trend="+8%"
            status="warning"
            icon={<Cpu className="h-4 w-4 text-blue-400" />}
          />
          <MetricsCard
            title="Memory Usage"
            value="3.2GB"
            trend="+0.5GB"
            status="normal"
            icon={<Memory className="h-4 w-4 text-purple-400" />}
          />
          <MetricsCard
            title="Disk I/O"
            value="12MB/s"
            trend="-3MB/s"
            status="normal"
            icon={<HardDrive className="h-4 w-4 text-amber-400" />}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Activity Log First */}
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
              <ActivityLog selectedServer={selectedServer} />
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
              <MLModelStatus />
            </div>
          </div>

          {/* CPU/Memory stacked on top of each other */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
              <h2 className="text-sm font-medium flex items-center gap-1.5 mb-3">
                <Cpu className="h-4 w-4 text-blue-400" />
                CPU Usage
              </h2>
              <div className="h-[150px]">
                <LineChart />
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
              <h2 className="text-sm font-medium flex items-center gap-1.5 mb-3">
                <Memory className="h-4 w-4 text-purple-400" />
                Memory Usage
              </h2>
              <div className="h-[150px]">
                <LineChart />
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
              <Tabs defaultValue="all">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium flex items-center gap-1.5">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                    Processes
                  </h2>
                  <TabsList className="h-7 bg-slate-800 p-0.5">
                    <TabsTrigger value="all" className="text-xs px-2 py-1">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="system" className="text-xs px-2 py-1">
                      System
                    </TabsTrigger>
                    <TabsTrigger value="user" className="text-xs px-2 py-1">
                      User
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  <ProcessTable />
                </TabsContent>
                <TabsContent value="system" className="mt-0">
                  <ProcessTable filterType="system" />
                </TabsContent>
                <TabsContent value="user" className="mt-0">
                  <ProcessTable filterType="user" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
