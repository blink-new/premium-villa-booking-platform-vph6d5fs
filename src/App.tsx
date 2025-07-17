import React, { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { 
  Home, 
  Users, 
  Calendar, 
  Settings, 
  Brain,
  Phone,
  BarChart3,
  Menu,
  X
} from 'lucide-react'
import { Homepage } from './components/website/Homepage'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { CRMDashboard } from './components/crm/CRMDashboard'
import { BookingEngine } from './components/booking/BookingEngine'
import { VoiceAgent } from './components/ai/VoiceAgent'
import { Toaster } from './components/ui/toaster'
import { blink } from './blink/client'
import { Villa, BookingRequest } from './types/villa'
import { Lead } from './types/crm'
import './App.css'

type AppView = 'website' | 'admin' | 'crm' | 'booking' | 'voice-agent'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('website')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock data
  const mockVilla: Villa = {
    id: 'villa_1',
    name: 'Luxury Beachfront Villa',
    description: 'Stunning oceanfront villa with private beach access and infinity pool overlooking the pristine waters of Seminyak Beach.',
    location: 'Seminyak Beach',
    city: 'Seminyak',
    country: 'Indonesia',
    price_per_night: 850,
    max_guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ['Private Pool', 'Beach Access', 'WiFi', 'Air Conditioning', 'Kitchen', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf'
    ],
    owner_id: 'owner_1',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  }

  const mockLeads: Lead[] = [
    {
      id: 'lead_1',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 123-4567',
      villa_interest: 'Luxury Beachfront Villa',
      check_in: '2024-08-15',
      check_out: '2024-08-22',
      guests: 4,
      budget: 15000,
      status: 'hot',
      score: 92,
      source: 'Google Ads',
      created_at: '2024-01-15T10:30:00Z',
      last_contact: '2024-01-15T14:20:00Z',
      notes: 'Very interested, mentioned anniversary celebration',
      ai_summary: 'High-intent lead looking for luxury accommodation for anniversary. Budget confirmed, dates flexible.',
      call_transcripts: [],
      interactions: []
    },
    {
      id: 'lead_2',
      name: 'Marcus Rodriguez',
      email: 'marcus.r@company.com',
      phone: '+1 (555) 987-6543',
      villa_interest: 'Mountain Retreat Chalet',
      check_in: '2024-09-10',
      check_out: '2024-09-17',
      guests: 8,
      budget: 25000,
      status: 'warm',
      score: 78,
      source: 'Referral',
      created_at: '2024-01-14T16:45:00Z',
      last_contact: '2024-01-15T09:15:00Z',
      notes: 'Corporate retreat, needs confirmation from team',
      ai_summary: 'Corporate booking for team retreat. Decision maker identified, waiting on final approval.',
      call_transcripts: [],
      interactions: []
    }
  ]

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleBookingSubmit = (booking: BookingRequest) => {
    console.log('Booking submitted:', booking)
    // Here you would typically send to your booking API
    alert('Booking request submitted successfully!')
  }

  const handleCallComplete = (leadId: string, transcript: string, outcome: string) => {
    console.log('Call completed:', { leadId, transcript, outcome })
    // Here you would update the lead status and save transcript
  }

  const navigation = [
    { id: 'website', name: 'Website', icon: Home, view: 'website' as AppView },
    { id: 'admin', name: 'Admin Panel', icon: Settings, view: 'admin' as AppView },
    { id: 'crm', name: 'CRM', icon: Users, view: 'crm' as AppView },
    { id: 'booking', name: 'Booking Engine', icon: Calendar, view: 'booking' as AppView },
    { id: 'voice-agent', name: 'AI Voice Agent', icon: Phone, view: 'voice-agent' as AppView },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-white text-lg">Loading VillaLux Platform...</p>
        </div>
      </div>
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'website':
        return <Homepage />
      case 'admin':
        return <AdminDashboard />
      case 'crm':
        return <CRMDashboard />
      case 'booking':
        return <BookingEngine villa={mockVilla} onBookingSubmit={handleBookingSubmit} />
      case 'voice-agent':
        return <VoiceAgent leads={mockLeads} onCallComplete={handleCallComplete} />
      default:
        return <Homepage />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white/90 backdrop-blur-sm border-slate-200"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-slate-800">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">VillaLux</h1>
              <p className="text-xs text-slate-400">Premium Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.view
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.view)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                  {item.id === 'voice-agent' && (
                    <Badge className="ml-auto bg-green-500/20 text-green-400 text-xs">
                      AI
                    </Badge>
                  )}
                </button>
              )
            })}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-slate-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user?.email || 'Demo User'}
                </p>
                <p className="text-xs text-slate-400">Platform Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar for non-website views */}
        {currentView !== 'website' && (
          <div className="bg-white border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  {navigation.find(nav => nav.view === currentView)?.name}
                </h2>
                <Badge variant="outline" className="text-xs">
                  {currentView === 'crm' && 'Customer Management'}
                  {currentView === 'admin' && 'Villa Management'}
                  {currentView === 'booking' && 'Reservation System'}
                  {currentView === 'voice-agent' && 'AI Assistant'}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  System Online
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* View content */}
        <main className={currentView === 'website' ? '' : 'min-h-screen bg-slate-50'}>
          {renderCurrentView()}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Toaster />
    </div>
  )
}

export default App