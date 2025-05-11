"use client"

import { useEffect, useState } from "react"
import { RequestsList } from "@/components/dashboard/requests-list"

export default function RequestsListClientWrapper({ serverRequests }: { serverRequests: any[] }) {
  const [requests, setRequests] = useState(serverRequests || [])

  useEffect(() => {
    console.log("[RequestsListClientWrapper] serverRequests:", serverRequests)
    if (!serverRequests || serverRequests.length === 0) {
      try {
        const mockRequests = JSON.parse(localStorage.getItem("mockRequests") || "[]")
        console.log("[RequestsListClientWrapper] Loaded mockRequests from localStorage:", mockRequests)
        setRequests(mockRequests)
      } catch (err) {
        console.error("[RequestsListClientWrapper] Error loading mockRequests:", err)
        setRequests([])
      }
    }
  }, [serverRequests])

  useEffect(() => {
    console.log("[RequestsListClientWrapper] Rendering requests:", requests)
  }, [requests])

  return <RequestsList requests={requests} />
}

