"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddServerDialog } from "@/components/add-server-dialog"
import { ServerDetailsDialog } from "@/components/server-details-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, ServerIcon, Check } from "lucide-react"

// Mock server data
const initialServers = [
  {
    id: 1,
    name: "prod-server-01",
    status: "online",
    host: "192.168.1.100",
    port: "22",
    username: "admin",
    uptime: "5d 12h 43m",
    cpu: "42%",
    memory: "67%",
    disk: "55%",
    network: "28%",
    packages: ["node-exporter", "prometheus-agent", "process-monitor", "network-monitor"],
  },
  {
    id: 2,
    name: "dev-server-02",
    status: "online",
    host: "192.168.1.101",
    port: "22",
    username: "developer",
    uptime: "2d 8h 15m",
    cpu: "23%",
    memory: "45%",
    disk: "32%",
    network: "15%",
    packages: ["node-exporter", "process-monitor"],
  },
  {
    id: 3,
    name: "staging-server-01",
    status: "warning",
    host: "192.168.1.102",
    port: "22",
    username: "deployer",
    uptime: "7d 3h 22m",
    cpu: "78%",
    memory: "82%",
    disk: "45%",
    network: "35%",
    packages: ["node-exporter", "prometheus-agent", "netdata", "security-scanner"],
  },
]

interface ServerManagementProps {
  onServerSelect?: (serverName: string) => void
}

export function ServerManagement({ onServerSelect }: ServerManagementProps) {
  const [servers, setServers] = useState(initialServers)
  const [selectedServer, setSelectedServer] = useState<number | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [currentServer, setCurrentServer] = useState<any>(null)

  const handleDeleteServer = (id: number) => {
    setServers(servers.filter((server) => server.id !== id))
  }

  const handleViewDetails = (server: any) => {
    setCurrentServer(server)
    setDetailsOpen(true)
  }

  const handleSaveServer = (updatedServer: any) => {
    setServers(servers.map((server) => (server.id === updatedServer.id ? updatedServer : server)))
    setCurrentServer(updatedServer)
  }

  const handleSelectServer = (server: any) => {
    // This would typically update some global state or context to show this server's metrics
    console.log(`Switching to server: ${server.name}`)
    if (onServerSelect) {
      onServerSelect(server.name)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-t border-white/20 pt-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-slate-400">Servers:</div>
          <div className="flex flex-wrap items-center gap-1">
            {servers.map((server) => (
              <DropdownMenu key={server.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 bg-slate-800 border-white/30 hover:bg-slate-700"
                    onClick={() => handleSelectServer(server)}
                  >
                    <span>{server.name}</span>
                    <div
                      className={`ml-1 h-2 w-2 rounded-full ${
                        server.status === "online"
                          ? "bg-green-500"
                          : server.status === "warning"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-white/30 text-white">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewDetails(server)}>
                    <ServerIcon className="mr-2 h-4 w-4" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleSelectServer(server)}>
                    <Check className="mr-2 h-4 w-4" />
                    <span>Select Server</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/30" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-500"
                        onSelect={(e) => {
                          e.preventDefault()
                          setSelectedServer(server.id)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Server</span>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-900 border-white/30 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                          This will permanently delete the server "{server.name}" and remove all associated monitoring
                          data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-800 border-white/30 text-white hover:bg-slate-700">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 border border-white/30"
                          onClick={() => handleDeleteServer(server.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            <AddServerDialog />
          </div>
        </div>
        <div className="flex items-center">{/* Empty div to maintain layout */}</div>
      </div>

      {/* Server Details Dialog */}
      {currentServer && (
        <ServerDetailsDialog
          server={currentServer}
          isOpen={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          onSave={handleSaveServer}
        />
      )}
    </>
  )
}
