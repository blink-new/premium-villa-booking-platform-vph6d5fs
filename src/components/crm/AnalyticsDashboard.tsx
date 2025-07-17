import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Clock, 
  DollarSign,
  Activity,
  Zap,
  Phone,
  MessageSquare
} from 'lucide-react'
import { Analytics } from '@/types/crm'

interface AnalyticsDashboardProps {
  analytics: Analytics
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  // Mock time series data
  const conversionTrend = [
    { month: 'Jan', rate: 18.2, leads: 120 },
    { month: 'Feb', rate: 21.5, leads: 145 },
    { month: 'Mar', rate: 19.8, leads: 132 },
    { month: 'Apr', rate: 23.1, leads: 167 },
    { month: 'May', rate: 24.5, leads: 156 },
    { month: 'Jun', rate: 26.3, leads: 189 }
  ]

  const responseTimeData = [
    { hour: '9AM', time: 3.2 },
    { hour: '10AM', time: 2.8 },
    { hour: '11AM', time: 2.1 },
    { hour: '12PM', time: 1.9 },
    { hour: '1PM', time: 1.7 },
    { hour: '2PM', time: 1.5 },
    { hour: '3PM', time: 1.8 },
    { hour: '4PM', time: 2.3 },
    { hour: '5PM', time: 2.9 }
  ]

  const channelPerformance = [
    { channel: 'AI Voice', leads: 89, conversion: 28.5, color: '#8B5CF6' },
    { channel: 'WhatsApp', leads: 67, conversion: 22.1, color: '#10B981' },
    { channel: 'Email', leads: 45, conversion: 18.7, color: '#F59E0B' },
    { channel: 'Human Call', leads: 34, conversion: 31.2, color: '#EF4444' }
  ]

  const leadSourceData = [
    { name: 'Google Ads', value: 35, color: '#3B82F6' },
    { name: 'Social Media', value: 28, color: '#8B5CF6' },
    { name: 'Referral', value: 22, color: '#10B981' },
    { name: 'Direct', value: 15, color: '#F59E0B' }
  ]

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444']

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${analytics.revenue_pipeline.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">AI Efficiency</p>
                <p className="text-2xl font-bold text-white">94.2%</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.2% improvement
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Call Success Rate</p>
                <p className="text-2xl font-bold text-white">87.3%</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.1% this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Message Response</p>
                <p className="text-2xl font-bold text-white">92.8%</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-red-400 text-sm">
              <TrendingDown className="w-4 h-4 mr-1" />
              -1.2% from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Trend */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
              Conversion Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversionTrend}>
                <defs>
                  <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#conversionGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Analysis */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-400" />
              Response Time by Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-400" />
              Channel Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="channel" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="conversion" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-400" />
              Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {leadSourceData.map((source, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-slate-300 text-sm">{source.name}</span>
                  <span className="text-slate-400 text-sm">({source.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drop-off Analysis */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-red-400" />
            Drop-off Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.drop_off_reasons} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="reason" type="category" stroke="#9CA3AF" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="count" fill="#EF4444" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}