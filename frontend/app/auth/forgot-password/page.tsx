"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-auth-pattern bg-cover bg-center bg-no-repeat p-4">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-900/70"></div>

      {/* Floating Balls Background */}
      <div className="floating-balls-container">
        <div className="floating-ball ball-1"></div>
        <div className="floating-ball ball-2"></div>
        <div className="floating-ball ball-3"></div>
        <div className="floating-ball ball-4"></div>
        <div className="floating-ball ball-5"></div>
        <div className="floating-ball ball-6"></div>
        <div className="floating-ball ball-7"></div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6 rounded-lg border border-slate-800/50 bg-slate-900/70 p-6 text-white backdrop-blur-xl">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-slate-400">
            {isSubmitted
              ? "Check your email for a reset link"
              : "Enter your email and we'll send you a link to reset your password"}
          </p>
        </div>

        {!isSubmitted ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="bg-slate-800/70 border-slate-700/70 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <div className="rounded-md bg-blue-500/20 p-4 text-blue-400 backdrop-blur-sm">
            <p>
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
              instructions.
            </p>
          </div>
        )}

        <div className="text-center">
          <Link href="/auth" className="inline-flex items-center text-sm text-slate-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
