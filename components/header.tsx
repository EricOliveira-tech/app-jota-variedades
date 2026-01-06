"use client"

import { Wifi, WifiOff } from "lucide-react"
import { useState, useEffect } from "react"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-emerald-500" />
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1">
              <WifiOff className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-700">Offline</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
