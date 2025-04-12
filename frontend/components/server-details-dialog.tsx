"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ServerIcon,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Network,
  Clock,
  Edit,
  Save,
  X,
  CheckCircle2,
  Package,
  Plus,
} from "lucide-react"

interface ServerDetailsProps {
  server: {
    id: number
    name: string
    status: string
    host?: string
    port?: string
    username?: string
    uptime?: string
    cpu?: string
    memory?: string
    disk?: string
    network?: string
    packages?: string[]
  }
  isOpen: boolean
  onClose: () => void
  onSave: (server: any) => void
}

export function ServerDetailsDialog({ server, isOpen, onClose, onSave }: ServerDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedServer, setEditedServer] = useState(server)
  const [newPackage, setNewPackage] = useState("")

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditedServer(server)
    setIsEditing(false)
  }

  const handleSave = () => {
    onSave(editedServer)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedServer((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addPackage = () => {
    if (newPackage.trim() && !editedServer.packages?.includes(newPackage.trim())) {
      setEditedServer((prev) => ({
        ...prev,
        packages: [...(prev.packages || []), newPackage.trim()],
      }))
      setNewPackage("")
    }
  }

  const removePackage = (pkg: string) => {
    setEditedServer((prev) => ({
      ...prev,
      packages: prev.packages?.filter((p) => p !== pkg) || [],
    }))
  }

  // Mock packages that are installed/monitored on the server
  const installedPackages = editedServer.packages || [
    "node-exporter",
    "prometheus-agent",
    "netdata",
    "process-monitor",
    "disk-analyzer",
    "network-monitor",
    "security-scanner",
  ]

  // Function to determine badge color based on package name
  const getPackageBadgeColor = (pkg: string) => {
    const colors = {
      "node-exporter": "bg-blue-500/20 text-blue-500",
      "prometheus-agent": "bg-purple-500/20 text-purple-500",
      netdata: "bg-green-500/20 text-green-500",
      "process-monitor": "bg-amber-500/20 text-amber-500",
      "disk-analyzer": "bg-red-500/20 text-red-500",
      "network-monitor": "bg-indigo-500/20 text-indigo-500",
      "security-scanner": "bg-pink-500/20 text-pink-500",
    }

    // Return a color based on the first character of the package name if not in the predefined list
    if (!Object.keys(colors).includes(pkg)) {
      const firstChar = pkg.charAt(0).toLowerCase()
      const charCode = firstChar.charCodeAt(0)
      const colorIndex = charCode % 6

      const fallbackColors = [
        "bg-blue-500/20 text-blue-500",
        "bg-purple-500/20 text-purple-500",
        "bg-green-500/20 text-green-500",
        "bg-amber-500/20 text-amber-500",
        "bg-indigo-500/20 text-indigo-500",
        "bg-pink-500/20 text-pink-500",
      ]

      return fallbackColors[colorIndex]
    }

    return colors[pkg as keyof typeof colors] || "bg-slate-500/20 text-slate-500"
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <ServerIcon className="h-5 w-5 text-blue-400" />
              Server Details
            </DialogTitle>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-slate-800 border-slate-700 hover:bg-slate-700"
                onClick={handleEdit}
              >
                <Edit className="h-3.5 w-3.5" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 bg-slate-800 border-slate-700 hover:bg-slate-700"
                  onClick={handleCancel}
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 gap-1 bg-green-600 hover:bg-green-700"
                  onClick={handleSave}
                >
                  <Save className="h-3.5 w-3.5" />
                  Save
                </Button>
              </div>
            )}
          </div>
          <DialogDescription className="text-slate-400">
            View and manage server information and monitoring settings.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{server.name}</h3>
                <Badge
                  className={`${
                    server.status === "online"
                      ? "bg-green-500/20 text-green-500"
                      : server.status === "warning"
                        ? "bg-amber-500/20 text-amber-500"
                        : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {server.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Uptime: {server.uptime || "3d 7h 22m"}</span>
              </div>
            </div>

            <Separator className="bg-slate-800" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: server.cpu || "42%" }} />
                </div>
                <div className="text-sm text-slate-400">{server.cpu || "42%"}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Memory className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">Memory Usage</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: server.memory || "67%" }} />
                </div>
                <div className="text-sm text-slate-400">{server.memory || "67%"}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium">Disk Usage</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: server.disk || "55%" }} />
                </div>
                <div className="text-sm text-slate-400">{server.disk || "55%"}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Network I/O</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: server.network || "28%" }} />
                </div>
                <div className="text-sm text-slate-400">{server.network || "28%"}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connection" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                {isEditing ? (
                  <Input
                    id="edit-name"
                    name="name"
                    value={editedServer.name}
                    onChange={handleChange}
                    className="col-span-3 bg-slate-800 border-slate-700"
                  />
                ) : (
                  <div className="col-span-3 text-sm">{server.name}</div>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-host" className="text-right">
                  Host
                </Label>
                {isEditing ? (
                  <Input
                    id="edit-host"
                    name="host"
                    value={editedServer.host || ""}
                    onChange={handleChange}
                    className="col-span-3 bg-slate-800 border-slate-700"
                  />
                ) : (
                  <div className="col-span-3 text-sm">{server.host || "192.168.1.100"}</div>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-port" className="text-right">
                  SSH Port
                </Label>
                {isEditing ? (
                  <Input
                    id="edit-port"
                    name="port"
                    value={editedServer.port || ""}
                    onChange={handleChange}
                    className="col-span-3 bg-slate-800 border-slate-700"
                  />
                ) : (
                  <div className="col-span-3 text-sm">{server.port || "22"}</div>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-username" className="text-right">
                  Username
                </Label>
                {isEditing ? (
                  <Input
                    id="edit-username"
                    name="username"
                    value={editedServer.username || ""}
                    onChange={handleChange}
                    className="col-span-3 bg-slate-800 border-slate-700"
                  />
                ) : (
                  <div className="col-span-3 text-sm">{server.username || "admin"}</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-3 pt-3">
            <div className="text-sm text-slate-400 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Package className="h-4 w-4 text-blue-400" />
                <span>Installed monitoring packages</span>
              </div>

              {isEditing && (
                <Badge variant="outline" className="bg-slate-800 text-white">
                  {installedPackages.length} packages
                </Badge>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Package className="absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    placeholder="Add new package..."
                    className="pl-8 bg-slate-800 border-slate-700"
                    value={newPackage}
                    onChange={(e) => setNewPackage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addPackage()
                      }
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPackage}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {installedPackages.map((pkg, index) => (
                  <Badge key={index} className={`${getPackageBadgeColor(pkg)} px-2 py-1`}>
                    {pkg}
                    <button className="ml-1.5 hover:text-white" onClick={() => removePackage(pkg)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}

                {installedPackages.length === 0 && (
                  <div className="text-sm text-slate-500 py-4 text-center w-full">
                    No packages installed. Add some packages to monitor this server.
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {installedPackages.map((pkg, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPackageBadgeColor(pkg)} px-2 py-0.5`}>{pkg}</Badge>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                ))}

                {installedPackages.length === 0 && (
                  <div className="text-sm text-slate-500 py-4 text-center w-full">
                    No packages installed. Add some packages to monitor this server.
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
