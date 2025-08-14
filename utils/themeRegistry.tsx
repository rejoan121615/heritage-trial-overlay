"use client"

import React, { ReactNode } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'

const ThemeRegistry = ({children} : {children: ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}

export default ThemeRegistry