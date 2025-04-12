"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Here you would typically:
    // 1. Call your logout API endpoint to invalidate the session
    // 2. Clear any auth tokens from localStorage/cookies
    // 3. Then redirect to auth page

    // Example:
    // await fetch('/api/auth/logout', { method: 'POST' });
    // localStorage.removeItem('authToken');

    // Redirect to auth page
    router.push("/auth")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-md bg-slate-800 p-2 hover:bg-slate-700 hover:text-red-400"
      title="Logout"
      onClick={handleLogout}
    >
      <LogOut size={16} />
      <span className="sr-only">Logout</span>
    </Button>
  )
}
