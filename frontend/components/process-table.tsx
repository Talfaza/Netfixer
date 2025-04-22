"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, AlertCircle } from "lucide-react"
import { ContextMenu } from "./context-menu"
import { ConfirmationModal } from "./confirmation-modal"

// Mock data for processes
const mockProcesses = [
  {
    id: 1,
    name: "system",
    pid: 4,
    cpu: 0.1,
    memory: "4.2MB",
    type: "system",
    command: "/sbin/launchd",
    user: "root",
  },
  {
    id: 2,
    name: "WindowServer",
    pid: 88,
    cpu: 1.2,
    memory: "145MB",
    type: "system",
    command: "/System/Library/PrivateFrameworks/SkyLight.framework/Resources/WindowServer",
    user: "root",
  },
  {
    id: 3,
    name: "chrome",
    pid: 498,
    cpu: 12.5,
    memory: "1.2GB",
    type: "user",
    command: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    user: "user1",
  },
  {
    id: 4,
    name: "node",
    pid: 592,
    cpu: 5.8,
    memory: "320MB",
    type: "user",
    command: "node server.js",
    user: "user1",
  },
  {
    id: 5,
    name: "postgres",
    pid: 621,
    cpu: 2.3,
    memory: "180MB",
    type: "system",
    command: "/usr/local/bin/postgres",
    user: "postgres",
  },
  {
    id: 6,
    name: "nginx",
    pid: 702,
    cpu: 0.5,
    memory: "24MB",
    type: "system",
    command: "/usr/sbin/nginx",
    user: "www-data",
  },
  {
    id: 7,
    name: "vscode",
    pid: 892,
    cpu: 3.7,
    memory: "450MB",
    type: "user",
    command: "/Applications/Visual Studio Code.app/Contents/MacOS/Electron",
    user: "user1",
  },
  {
    id: 12,
    name: "python",
    pid: 1678,
    cpu: 15.2,
    memory: "520MB",
    type: "user",
    command: "python3 data_processor.py",
    user: "user1",
    alert: true,
  },
]

interface ProcessTableProps {
  filterType?: string
}

export default function ProcessTable({ filterType }: ProcessTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("cpu")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [processes, setProcesses] = useState(mockProcesses)

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    show: boolean
    x: number
    y: number
    processId: number
    processName: string
  }>({
    show: false,
    x: 0,
    y: 0,
    processId: 0,
    processName: "",
  })

  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState<{
    show: boolean
    actionType: "restart" | "kill"
    processId: number
    processName: string
  }>({
    show: false,
    actionType: "restart",
    processId: 0,
    processName: "",
  })

  // Filter processes based on type and search term
  useEffect(() => {
    let filteredProcesses = [...mockProcesses]

    if (filterType && filterType !== "all") {
      filteredProcesses = filteredProcesses.filter((process) => process.type === filterType)
    }

    if (searchTerm) {
      filteredProcesses = filteredProcesses.filter(
        (process) =>
          process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          process.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
          process.user.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort processes
    filteredProcesses.sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

    setProcesses(filteredProcesses)
  }, [filterType, searchTerm, sortColumn, sortDirection])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const handleRestartProcess = (processId: number, processName: string) => {
    setConfirmationModal({
      show: true,
      actionType: "restart",
      processId,
      processName,
    })
  }

  const handleKillProcess = (processId: number, processName: string) => {
    setConfirmationModal({
      show: true,
      actionType: "kill",
      processId,
      processName,
    })
  }

  const executeProcessAction = () => {
    const { actionType, processId } = confirmationModal

    if (actionType === "restart") {
      console.log(`Restarting process ${processId}`)
      // Here you would call your API to restart the process
    } else {
      console.log(`Killing process ${processId}`)
      // Here you would call your API to kill the process
    }
  }

  const handleContextMenu = (e: React.MouseEvent, process: any) => {
    e.preventDefault()
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      processId: process.pid,
      processName: process.name,
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, show: false })
  }

  const closeConfirmationModal = () => {
    setConfirmationModal({ ...confirmationModal, show: false })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2 flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-500" />
          <Input
            placeholder="Search processes..."
            className="pl-7 h-7 text-xs bg-slate-800 border-white/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-white/30 flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-slate-800/50 border-b border-white/20">
              <TableHead className="w-[50px] h-8 text-xs">PID</TableHead>
              <TableHead className="h-8 text-xs">
                <button className="flex items-center gap-1" onClick={() => handleSort("name")}>
                  Process Name
                  {sortColumn === "name" && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${sortDirection === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
              </TableHead>
              <TableHead className="h-8 text-xs">
                <button className="flex items-center gap-1" onClick={() => handleSort("cpu")}>
                  CPU %
                  {sortColumn === "cpu" && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${sortDirection === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
              </TableHead>
              <TableHead className="h-8 text-xs">
                <button className="flex items-center gap-1" onClick={() => handleSort("memory")}>
                  Memory
                  {sortColumn === "memory" && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${sortDirection === "asc" ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
              </TableHead>
              <TableHead className="h-8 text-xs">User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-3 text-slate-500 text-xs">
                  No processes found
                </TableCell>
              </TableRow>
            ) : (
              processes.map((process) => (
                <TableRow
                  key={process.id}
                  className="hover:bg-slate-800/50 cursor-default border-b border-white/10"
                  onContextMenu={(e) => handleContextMenu(e, process)}
                >
                  <TableCell className="font-mono text-xs py-1.5">{process.pid}</TableCell>
                  <TableCell className="flex items-center gap-2 text-xs py-1.5">
                    {process.alert && <AlertCircle className="h-3.5 w-3.5 text-red-500" />}
                    {process.name}
                  </TableCell>
                  <TableCell className="text-xs py-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-slate-700 overflow-hidden border border-white/10">
                        <div
                          className={`h-full ${process.cpu > 10 ? "bg-red-500" : process.cpu > 5 ? "bg-amber-500" : "bg-green-500"
                            }`}
                          style={{ width: `${Math.min(process.cpu * 5, 100)}%` }}
                        />
                      </div>
                      <span>{process.cpu.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs py-1.5">{process.memory}</TableCell>
                  <TableCell className="text-xs py-1.5">{process.user}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-1 text-xs text-slate-500">
        Showing {processes.length} of {mockProcesses.length} processes
      </div>

      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          processId={contextMenu.processId}
          processName={contextMenu.processName}
          onRestart={handleRestartProcess}
          onKill={handleKillProcess}
        />
      )}

      <ConfirmationModal
        isOpen={confirmationModal.show}
        onClose={closeConfirmationModal}
        onConfirm={executeProcessAction}
        title={
          confirmationModal.actionType === "restart"
            ? `Restart ${confirmationModal.processName}?`
            : `Kill ${confirmationModal.processName}?`
        }
        description={
          confirmationModal.actionType === "restart"
            ? `Are you sure you want to restart process "${confirmationModal.processName}" (PID: ${confirmationModal.processId})?`
            : `Are you sure you want to kill process "${confirmationModal.processName}" (PID: ${confirmationModal.processId})?`
        }
        actionType={confirmationModal.actionType}
      />
    </div>
  )
}
