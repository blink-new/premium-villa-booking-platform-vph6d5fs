import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Target,
  Users,
  MessageSquare,
  Phone,
  Zap,
  Eye,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { Lead } from '@/types/crm'

interface AIInsightsProps {
  leads: Lead[]
}

export function AIInsights({ leads }: AIInsightsProps) {
  // Calculate insights from leads data
  const totalLeads = leads.length
  const hotLeads = leads.filter(lead => lead.status === 'hot').length
  const avgScore = leads.reduce((sum, lead) => sum + lead.score, 0) / totalLeads
  
  const dropOffReasons = [
    { reason: 'Price too high', count: 45, percentage: 32, trend: 'up' },
    { reason: 'Dates unavailable', count: 32, percentage: 23, trend: 'down' },
    { reason: 'Location not suitable', count: 28, percentage: 20, trend: 'stable' },
    { reason: 'Amenities mismatch', count: 18, percentage: 13, trend: 'up' },
    { reason: 'Response time slow', count: 12, percentage: 8, trend: 'down' },
    { reason: 'Other', count: 6, percentage: 4, trend: 'stable' }
  ]

  const conversionFunnel = [
    { stage: 'Form Submitted', count: 156, percentage: 100, color: 'bg-blue-500' },
    { stage: 'AI Call Answered', count: 134, percentage: 86, color: 'bg-purple-500' },
    { stage: 'Interest Confirmed', count: 89, percentage: 57, color: 'bg-green-500' },
    { stage: 'Quote Sent', count: 67, percentage: 43, color: 'bg-orange-500' },
    { stage: 'Booking Completed', count: 38, percentage: 24, color: 'bg-red-500' }
  ]

  const aiPredictions = [
    {
      title: 'High Conversion Probability',
      description: 'Leads with luxury villa interest and budget >$20k have 78% conversion rate',
      confidence: 94,
      impact: 'high',
      icon: <Target className="w-5 h-5" />
    },
    {
      title: 'Optimal Contact Time',
      description: 'Calls between 2-4 PM show 45% higher answer rates',
      confidence: 87,
      impact: 'medium',
      icon: <Phone className="w-5 h-5" />
    },
    {
      title: 'Price Sensitivity Pattern',
      description: 'Leads from social media are 60% more price-sensitive',
      confidence: 82,
      impact: 'medium',
      icon: <TrendingDown className="w-5 h-5" />
    },
    {
      title: 'Follow-up Timing',
      description: 'Second follow-up after 48 hours increases conversion by 23%',
      confidence: 91,
      impact: 'high',
      icon: <MessageSquare className="w-5 h-5" />
    }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-400" />
      case 'down': return <TrendingDown className="w-4 h-4 text-green-400" />
      default: return <Activity className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                AI Powered
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Neural Analysis</h3>
            <p className="text-slate-400 text-sm">
              Advanced pattern recognition analyzing {totalLeads} leads with 94% accuracy
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Processing Power</span>
                <span className="text-purple-400">94%</span>
              </div>
              <Progress value={94} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Optimized
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Conversion Rate</h3>
            <p className="text-slate-400 text-sm">
              AI-optimized lead scoring increased conversions by 34%
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Current Rate</span>
                <span className="text-green-400">24.5%</span>
              </div>
              <Progress value={24.5} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                Real-time
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
            <p className="text-slate-400 text-sm">
              AI agent responds within 30 seconds, 85% faster than human agents
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Avg Response</span>
                <span className="text-orange-400">2.3m</span>
              </div>
              <Progress value={85} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drop-off Analysis */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-red-400" />
              Drop-off Reasons Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dropOffReasons.map((reason, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{reason.reason}</span>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(reason.trend)}
                        <span className="text-slate-400 text-sm">{reason.count}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={reason.percentage} className="flex-1 h-2" />
                      <span className="text-slate-400 text-xs w-10">{reason.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{stage.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">{stage.count}</span>
                      <span className="text-slate-500 text-xs">({stage.percentage}%)</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div 
                        className={`${stage.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                  {index < conversionFunnel.length - 1 && (
                    <div className="absolute right-0 top-8 text-slate-600">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Predictions */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-400" />
            AI Predictions & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiPredictions.map((prediction, index) => (
              <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                      {prediction.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{prediction.title}</h4>
                      <Badge className={`text-xs ${getImpactColor(prediction.impact)}`}>
                        {prediction.impact.toUpperCase()} IMPACT
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-3">{prediction.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">Confidence Level</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={prediction.confidence} className="w-20 h-2" />
                    <span className="text-green-400 text-sm font-medium">{prediction.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Monitoring */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-400" />
            Real-time Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Active Leads</h4>
              <p className="text-2xl font-bold text-green-400">{hotLeads}</p>
              <p className="text-slate-400 text-sm">Currently being processed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">AI Calls Today</h4>
              <p className="text-2xl font-bold text-blue-400">47</p>
              <p className="text-slate-400 text-sm">89% success rate</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Messages Sent</h4>
              <p className="text-2xl font-bold text-purple-400">134</p>
              <p className="text-slate-400 text-sm">Across all channels</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}