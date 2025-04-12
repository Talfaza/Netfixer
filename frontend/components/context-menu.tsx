"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { RefreshCw, XCircle, Copy } from "lucide-react"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  processId: number
  processName: string
  onRestart: (id: number, name: string) => void
  onKill: (id: number, name: string) => void
}

export function ContextMenu({ x, y, onClose, processId, processName, onRestart, onKill }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Close the menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Close the menu when pressing escape
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  // Adjust position to keep menu in viewport
  const adjustedPosition = () => {
    if (typeof window === "undefined") return { top: y, left: x }

    const menuWidth = 180
    const menuHeight = 130 // Reduced height since we removed an option
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const adjustedX = x + menuWidth > windowWidth ? windowWidth - menuWidth - 10 : x
    const adjustedY = y + menuHeight > windowHeight ? windowHeight - menuHeight - 10 : y

    return {
      top: adjustedY,
      left: adjustedX,
    }
  }

  const position = adjustedPosition()

  if (!mounted) return null

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-50 w-44 rounded-md border border-white/40 bg-slate-800 shadow-md"
      style={{ top: position.top, left: position.left }}
    >
      <div className="py-1 text-sm text-white">
        <div className="px-3 py-2 font-medium border-b border-white/30 truncate">{processName}</div>
        <button
          className="flex w-full items-center px-3 py-2 hover:bg-slate-700"
          onClick={() => {
            onRestart(processId, processName)
            onClose()
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4 text-green-400" />
          Restart Process
        </button>
        <button
          className="flex w-full items-center px-3 py-2 hover:bg-slate-700 border-t border-white/10"
          onClick={() => {
            onKill(processId, processName)
            onClose()
          }}
        >
          <XCircle className="mr-2 h-4 w-4 text-red-400" />
          Kill Process
        </button>
        <button
          className="flex w-full items-center px-3 py-2 hover:bg-slate-700 border-t border-white/10"
          onClick={() => {
            navigator.clipboard.writeText(processId.toString())
            onClose()
          }}
        >
          <Copy className="mr-2 h-4 w-4 text-slate-400" />
          Copy PID
        </button>
      </div>
    </div>,
    document.body,
  )
}
