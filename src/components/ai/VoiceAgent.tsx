import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  Mail,
  Bot,
  User,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Mic,
  MicOff,
  PhoneOff,
  UserPlus,
  Activity
} from 'lucide-react'
import { Lead } from '@/types/crm'

interface VoiceAgentProps {
  leads: Lead[]
  onCallComplete: (leadId: string, transcript: string, outcome: string) => void
}

interface CallSession {
  id: string
  leadId: string
  status: 'dialing' | 'connected' | 'talking' | 'listening' | 'completed' | 'failed'
  duration: number
  transcript: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  keyPoints: string[]
  nextAction: string
}

export function VoiceAgent({ leads, onCallComplete }: VoiceAgentProps) {
  const [activeCall, setActiveCall] = useState<CallSession | null>(null)
  const [callQueue, setCallQueue] = useState<Lead[]>([])
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [callHistory, setCallHistory] = useState<CallSession[]>([])
  const [agentStatus, setAgentStatus] = useState<'idle' | 'busy' | 'paused'>('idle')

  useEffect(() => {
    // Auto-queue hot leads
    const hotLeads = leads.filter(lead => lead.status === 'hot' && !callHistory.some(call => call.leadId === lead.id))
    setCallQueue(hotLeads.slice(0, 5))
  }, [leads, callHistory])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeCall && activeCall.status === 'connected') {
      interval = setInterval(() => {
        setActiveCall(prev => prev ? { ...prev, duration: prev.duration + 1 } : null)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCall])

  const startCall = (lead: Lead) => {
    const callSession: CallSession = {
      id: `call_${Date.now()}`,
      leadId: lead.id,
      status: 'dialing',
      duration: 0,
      transcript: [],
      sentiment: 'neutral',
      keyPoints: [],
      nextAction: ''
    }

    setActiveCall(callSession)
    setAgentStatus('busy')

    // Simulate call progression
    setTimeout(() => {
      setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null)
      
      // Simulate conversation
      setTimeout(() => {
        simulateConversation(callSession, lead)
      }, 2000)
    }, 3000)
  }

  const simulateConversation = (session: CallSession, lead: Lead) => {
    const conversationFlow = [
      {
        speaker: 'AI',
        message: `Hello ${lead.name}, this is Emma from VillaLux. I'm calling regarding your inquiry about ${lead.villa_interest}. Is this a good time to chat?`,
        duration: 5
      },
      {
        speaker: 'Customer',
        message: 'Yes, I was just looking at your website. I\'m interested in booking for my anniversary.',
        duration: 3
      },
      {
        speaker: 'AI',
        message: 'That\'s wonderful! Congratulations on your anniversary. I see you\'re looking at dates from ${lead.check_in} to ${lead.check_out} for ${lead.guests} guests. The villa has amazing sunset views perfect for celebrations.',
        duration: 6
      },
      {
        speaker: 'Customer',
        message: 'That sounds perfect. What\'s included in the booking? And is there availability?',
        duration: 4
      },
      {
        speaker: 'AI',
        message: 'Great question! The villa includes private pool, daily housekeeping, and concierge service. I\'m checking availability now... Yes, those dates are available. The total would be $${lead.budget} for your stay. Would you like me to send you a detailed quote?',
        duration: 8
      }
    ]

    let currentIndex = 0
    const playConversation = () => {
      if (currentIndex < conversationFlow.length) {
        const currentMessage = conversationFlow[currentIndex]
        
        setActiveCall(prev => prev ? {
          ...prev,
          status: currentMessage.speaker === 'AI' ? 'talking' : 'listening',
          transcript: [...prev.transcript, `${currentMessage.speaker}: ${currentMessage.message}`]
        } : null)

        setTimeout(() => {
          currentIndex++
          playConversation()
        }, currentMessage.duration * 1000)
      } else {
        // End call
        completeCall(session, lead)
      }
    }

    playConversation()
  }

  const completeCall = (session: CallSession, lead: Lead) => {
    const completedCall: CallSession = {
      ...session,
      status: 'completed',
      sentiment: 'positive',
      keyPoints: [
        'Anniversary celebration',
        'Confirmed budget and dates',
        'Interested in sunset views',
        'Requested detailed quote'
      ],
      nextAction: 'Send detailed quote via email'
    }

    setActiveCall(null)
    setCallHistory(prev => [...prev, completedCall])
    setAgentStatus('idle')
    
    onCallComplete(lead.id, completedCall.transcript.join('\n'), 'quote_requested')

    // Auto-start next call if in auto mode
    if (isAutoMode && callQueue.length > 1) {
      setTimeout(() => {
        const nextLead = callQueue[1]
        startCall(nextLead)
        setCallQueue(prev => prev.slice(1))
      }, 5000)
    }
  }

  const endCall = () => {
    if (activeCall) {
      setActiveCall(null)
      setAgentStatus('idle')
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status: CallSession['status']) => {
    switch (status) {
      case 'dialing': return 'bg-yellow-500/20 text-yellow-400'
      case 'connected': return 'bg-green-500/20 text-green-400'
      case 'talking': return 'bg-blue-500/20 text-blue-400'
      case 'listening': return 'bg-purple-500/20 text-purple-400'
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'failed': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Header */}
      <div className="relative border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  AI Voice Agent
                </h1>
              </div>
              <Badge className={`${agentStatus === 'busy' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'}`}>
                <Activity className="w-3 h-3 mr-1" />
                {agentStatus === 'busy' ? 'Active Call' : 'Standby'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant={isAutoMode ? "default" : "outline"}
                onClick={() => setIsAutoMode(!isAutoMode)}
                className={isAutoMode ? "bg-blue-600 hover:bg-blue-700" : "border-slate-700 text-slate-300"}
              >
                <Zap className="w-4 h-4 mr-2" />
                Auto Mode
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Call */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  {activeCall ? 'Active Call' : 'Call Center'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeCall ? (
                  <div className="space-y-6">
                    {/* Call Info */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leads.find(l => l.id === activeCall.leadId)?.name}`} />
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            {leads.find(l => l.id === activeCall.leadId)?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white">{leads.find(l => l.id === activeCall.leadId)?.name}</p>
                          <p className="text-sm text-slate-400">{leads.find(l => l.id === activeCall.leadId)?.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(activeCall.status)}>
                          {activeCall.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-white font-mono">{formatDuration(activeCall.duration)}</p>
                          <p className="text-xs text-slate-400">Duration</p>
                        </div>
                      </div>
                    </div>

                    {/* Call Controls */}
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        disabled={activeCall.status === 'dialing'}
                      >
                        {activeCall.status === 'talking' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <Volume2 className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={endCall}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <PhoneOff className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <UserPlus className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Live Transcript */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">Live Transcript</h3>
                      <div className="h-64 overflow-y-auto bg-slate-800/30 rounded-lg p-4 space-y-2">
                        {activeCall.transcript.map((message, index) => {
                          const [speaker, ...messageParts] = message.split(': ')
                          const messageText = messageParts.join(': ')
                          return (
                            <div key={index} className={`flex ${speaker === 'AI' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                speaker === 'AI' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-slate-700 text-slate-200'
                              }`}>
                                <p className="text-xs font-medium mb-1">{speaker}</p>
                                <p className="text-sm">{messageText}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bot className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-4">AI Voice Agent is ready to make calls</p>
                    <p className="text-sm text-slate-500">Select a lead from the queue to start calling</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Call Queue & History */}
          <div className="space-y-6">
            {/* Call Queue */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Call Queue</span>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {callQueue.length} leads
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {callQueue.slice(0, 5).map((lead, index) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs text-slate-300">
                          {index + 1}
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                          <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{lead.name}</p>
                          <p className="text-xs text-slate-400">{lead.villa_interest}</p>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => startCall(lead)}
                        disabled={!!activeCall}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <PhoneCall className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {callQueue.length === 0 && (
                    <p className="text-slate-400 text-center py-4">No leads in queue</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Calls */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {callHistory.slice(-5).reverse().map((call) => {
                    const lead = leads.find(l => l.id === call.leadId)
                    return (
                      <div key={call.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">{lead?.name}</p>
                          <Badge className={getStatusColor(call.status)}>
                            {call.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{formatDuration(call.duration)}</span>
                          <span>{call.sentiment}</span>
                        </div>
                        {call.nextAction && (
                          <p className="text-xs text-blue-400 mt-1">{call.nextAction}</p>
                        )}
                      </div>
                    )
                  })}
                  
                  {callHistory.length === 0 && (
                    <p className="text-slate-400 text-center py-4">No recent calls</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}