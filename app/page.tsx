"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")

  const handleLogin = (username: string, password: string) => {
    if (username === "opel" && password === "password") {
      setIsLoggedIn(true)
      setCurrentPage("home")
    } else {
      alert("Invalid credentials. Try username: opel, password: password")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("home")
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <Dashboard currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
}
