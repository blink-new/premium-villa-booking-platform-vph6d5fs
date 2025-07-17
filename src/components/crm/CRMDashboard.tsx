import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Filter, 
  Phone, 
  MessageSquare, 
  Mail, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Zap,
  Brain,
  Activity,
  Eye,
  MoreVertical,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { Lead, Analytics } from '@/types/crm'
import { LeadTimeline } from './LeadTimeline'
import { AIInsights } from './AIInsights'
import { AnalyticsDashboard } from './AnalyticsDashboard'

export function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        phone: '+1 (555) 123-4567',
        villa_interest: 'Luxury Beachfront Villa, Bali',
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
        id: '2',
        name: 'Marcus Rodriguez',
        email: 'marcus.r@company.com',
        phone: '+1 (555) 987-6543',
        villa_interest: 'Mountain Retreat, Aspen',
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
      },
      {
        id: '3',
        name: 'Emma Thompson',
        email: 'emma.thompson@gmail.com',
        phone: '+44 20 7946 0958',
        villa_interest: 'Tuscan Villa, Italy',
        check_in: '2024-07-20',
        check_out: '2024-07-27',
        guests: 6,
        budget: 12000,
        status: 'cold',
        score: 45,
        source: 'Social Media',
        created_at: '2024-01-13T11:20:00Z',
        last_contact: '2024-01-13T11:20:00Z',
        notes: 'Price sensitive, looking for alternatives',
        ai_summary: 'Budget-conscious traveler. Interested but concerned about pricing. Needs value proposition.',
        call_transcripts: [],
        interactions: []
      }
    ]

    const mockAnalytics: Analytics = {
      total_leads: 156,
      conversion_rate: 24.5,
      avg_response_time: 2.3,
      hot_leads: 23,
      revenue_pipeline: 450000,
      drop_off_reasons: [
        { reason: 'Price too high', count: 45 },
        { reason: 'Dates unavailable', count: 32 },
        { reason: 'Location not suitable', count: 28 }
      ],
      intent_funnel: [
        { stage: 'Form Submitted', count: 156 },
        { stage: 'AI Call Answered', count: 134 },
        { stage: 'Interest Confirmed', count: 89 },
        { stage: 'Quote Sent', count: 67 },
        { stage: 'Booking Completed', count: 38 }
      ]
    }

    setLeads(mockLeads)
    setAnalytics(mockAnalytics)
  }, [])

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'hot': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'warm': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'cold': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'booked': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'lost': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-orange-400'
    return 'text-red-400'
  }

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.villa_interest.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Header */}
      <div className="relative border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Neural CRM
                </h1>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search leads, villas, or interactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-blue-500/50"
                />
              </div>
              <Button variant="outline" size="sm" className="border-slate-700/50 text-slate-300 hover:bg-slate-800/50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Users className="w-4 h-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Leads</p>
                        <p className="text-2xl font-bold text-white">{analytics.total_leads}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Conversion Rate</p>
                        <p className="text-2xl font-bold text-white">{analytics.conversion_rate}%</p>
                      </div>
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +3.2% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Avg Response Time</p>
                        <p className="text-2xl font-bold text-white">{analytics.avg_response_time}m</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-orange-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-green-400 text-sm">
                      <Zap className="w-4 h-4 mr-1" />
                      AI-powered responses
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Revenue Pipeline</p>
                        <p className="text-2xl font-bold text-white">${analytics.revenue_pipeline.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +18% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Leads */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-400" />
                  Recent High-Priority Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLeads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{lead.name}</p>
                          <p className="text-sm text-slate-400">{lead.villa_interest}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status.toUpperCase()}
                        </Badge>
                        <div className="text-right">
                          <p className={`font-bold ${getScoreColor(lead.score)}`}>
                            {lead.score}%
                          </p>
                          <p className="text-xs text-slate-400">AI Score</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Leads List */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Lead Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedLead?.id === lead.id
                              ? 'bg-blue-500/10 border-blue-500/30'
                              : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50'
                          }`}
                          onClick={() => setSelectedLead(lead)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                                <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                                  {lead.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-white">{lead.name}</p>
                                <p className="text-xs text-slate-400">{lead.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(lead.status)}>
                                {lead.status}
                              </Badge>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Villa Interest</p>
                              <p className="text-white truncate">{lead.villa_interest}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Budget</p>
                              <p className="text-white">${lead.budget.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                                AI Score: {lead.score}%
                              </div>
                              <Progress value={lead.score} className="w-20 h-2" />
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-green-400">
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-purple-400">
                                <Mail className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lead Details */}
              <div>
                {selectedLead ? (
                  <LeadTimeline lead={selectedLead} />
                ) : (
                  <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <Eye className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a lead to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            {analytics && <AnalyticsDashboard analytics={analytics} />}
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsights leads={leads} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}