"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function AddServerDialog() {
  const [serverName, setServerName] = useState("")
  const [serverHost, setServerHost] = useState("")
  const [serverPort, setServerPort] = useState("22")
  const [serverUsername, setServerUsername] = useState("")
  const [customPackages, setCustomPackages] = useState<string[]>([])
  const [newPackage, setNewPackage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would add the server to your state/database
    console.log("Adding server:", {
      serverName,
      serverHost,
      serverPort,
      serverUsername,
      packages: [...customPackages],
    })

    // Reset form and close dialog
    setServerName("")
    setServerHost("")
    setServerPort("22")
    setServerUsername("")
    setCustomPackages([])
    setIsOpen(false)
  }

  const addCustomPackage = () => {
    if (newPackage.trim() && !customPackages.includes(newPackage.trim())) {
      setCustomPackages([...customPackages, newPackage.trim()])
      setNewPackage("")
    }
  }

  const removeCustomPackage = (pkg: string) => {
    setCustomPackages(customPackages.filter((p) => p !== pkg))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 rounded-full bg-slate-700/40 hover:bg-slate-700/60 p-0 ml-1"
          title="Add Server"
        >
          <Plus className="h-3 w-3 text-slate-300/70" />
          <span className="sr-only">Add Server</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Add New Server</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter the details of the server you want to monitor.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  className="col-span-3 bg-slate-800 border-slate-700"
                  placeholder="prod-server-01"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="host" className="text-right">
                  Host
                </Label>
                <Input
                  id="host"
                  value={serverHost}
                  onChange={(e) => setServerHost(e.target.value)}
                  className="col-span-3 bg-slate-800 border-slate-700"
                  placeholder="192.168.1.100 or example.com"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">
                  SSH Port
                </Label>
                <Input
                  id="port"
                  value={serverPort}
                  onChange={(e) => setServerPort(e.target.value)}
                  className="col-span-3 bg-slate-800 border-slate-700"
                  type="number"
                  placeholder="22"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={serverUsername}
                  onChange={(e) => setServerUsername(e.target.value)}
                  className="col-span-3 bg-slate-800 border-slate-700"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <Separator className="bg-slate-800 my-2" />

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">Custom Packages</Label>
              <div className="col-span-3 space-y-3">
                {/* Custom package input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Add custom package..."
                      className="bg-slate-800 border-slate-700"
                      value={newPackage}
                      onChange={(e) => setNewPackage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addCustomPackage()
                        }
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCustomPackage}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                  >
                    Add
                  </Button>
                </div>

                {/* Selected packages display */}
                {customPackages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {customPackages.map((pkg) => (
                      <div
                        key={pkg}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-2 py-1 rounded-full flex items-center"
                      >
                        {pkg}
                        <button
                          className="ml-1.5 hover:text-blue-200"
                          onClick={() => removeCustomPackage(pkg)}
                          type="button"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Add Server
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
