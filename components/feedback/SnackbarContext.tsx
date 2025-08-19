// context/SnackbarContext.tsx
"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

type SnackbarContextType = {
  showMessage: (msg: string, severity?: "success" | "error" | "warning" | "info") => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<"success" | "error" | "warning" | "info">("info")

  const showMessage = (msg: string, sev: "success" | "error" | "warning" | "info" = "info") => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }

  const handleClose = (_?: unknown, reason?: string) => {
    if (reason === "clickaway") return
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider")
  }
  return context
}
