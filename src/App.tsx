import React from 'react'
import { CRMDashboard } from './components/crm/CRMDashboard'
import { Toaster } from './components/ui/toaster'
import './App.css'

function App() {
  return (
    <div className="App">
      <CRMDashboard />
      <Toaster />
    </div>
  )
}

export default App