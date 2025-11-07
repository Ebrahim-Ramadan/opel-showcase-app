"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginPageProps {
  onLogin: (username: string, password: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(102,51,153,0.1)_25%,rgba(102,51,153,0.1)_50%,transparent_50%,transparent_75%,rgba(102,51,153,0.1)_75%,rgba(102,51,153,0.1))] bg-[length:60px_60px] animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              OPEL
            </div>
          </div>
          <p className="text-gray-400 text-sm tracking-widest">PREMIUM MOTORS</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 border border-purple-500/20 rounded-lg p-8 backdrop-blur-sm shadow-2xl glow-pulse">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Username</label>
              <Input
                type="text"
                placeholder="opel"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-800 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Password</label>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/50"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* <div className="mt-6 pt-6 border-t border-purple-500/20">
            <p className="text-center text-sm text-gray-400">
              Demo Credentials:
              <br />
              <span className="text-purple-300 font-mono">opel / password</span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
