import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Bot,
  User,
  Zap,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { Lead } from '@/types/crm'
import { format } from 'date-fns'

interface LeadTimelineProps {
  lead: Lead
}

export function LeadTimeline({ lead }: LeadTimelineProps) {
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

  // Mock timeline events
  const timelineEvents = [
    {
      id: '1',
      type: 'form_submission',
      title: 'Lead Form Submitted',
      description: 'Initial inquiry submitted via website',
      timestamp: lead.created_at,
      icon: <User className="w-4 h-4" />,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      type: 'ai_call',
      title: 'AI Assistant Call',
      description: 'Automated call initiated within 30 seconds',
      timestamp: new Date(new Date(lead.created_at).getTime() + 30000).toISOString(),
      icon: <Bot className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      id: '3',
      type: 'whatsapp',
      title: 'WhatsApp Message Sent',
      description: 'Villa details and pricing sent via WhatsApp',
      timestamp: new Date(new Date(lead.created_at).getTime() + 300000).toISOString(),
      icon: <MessageSquare className="w-4 h-4" />,
      color: 'bg-green-500'
    },
    {
      id: '4',
      type: 'follow_up',
      title: 'Follow-up Required',
      description: 'AI recommends human agent follow-up',
      timestamp: lead.last_contact,
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Lead Overview */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                <AvatarFallback className="bg-slate-700 text-slate-300">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                <p className="text-slate-400">{lead.email}</p>
              </div>
            </div>
            <Badge className={getStatusColor(lead.status)}>
              {lead.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Score */}
          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">AI Lead Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                {lead.score}%
              </span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
          </div>

          {/* Lead Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Phone:</span>
                <span className="text-white">{lead.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Source:</span>
                <span className="text-white">{lead.source}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Guests:</span>
                <span className="text-white">{lead.guests}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Check-in:</span>
                <span className="text-white">{format(new Date(lead.check_in), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Check-out:</span>
                <span className="text-white">{format(new Date(lead.check_out), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Budget:</span>
                <span className="text-white">${lead.budget.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Villa Interest */}
          <div className="p-3 bg-slate-800/30 rounded-lg">
            <p className="text-slate-400 text-sm mb-1">Villa Interest</p>
            <p className="text-white font-medium">{lead.villa_interest}</p>
          </div>

          {/* AI Summary */}
          <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm">AI Summary</span>
            </div>
            <p className="text-slate-300 text-sm">{lead.ai_summary}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30">
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-400" />
            Interaction Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="relative">
                  <div className={`w-8 h-8 ${event.color} rounded-full flex items-center justify-center text-white`}>
                    {event.icon}
                  </div>
                  {index < timelineEvents.length - 1 && (
                    <div className="absolute top-8 left-4 w-px h-8 bg-slate-700" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{event.title}</h4>
                    <span className="text-slate-400 text-xs">
                      {format(new Date(event.timestamp), 'MMM dd, HH:mm')}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bot className="w-5 h-5 mr-2 text-purple-400" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
              <div>
                <p className="text-white font-medium text-sm">Send Alternative Options</p>
                <p className="text-slate-400 text-xs">Lead showed price sensitivity. Send 2-3 similar villas with lower pricing.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
              <div>
                <p className="text-white font-medium text-sm">Schedule Follow-up Call</p>
                <p className="text-slate-400 text-xs">Optimal follow-up time: Tomorrow 2-4 PM (based on response patterns)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
              <div>
                <p className="text-white font-medium text-sm">Highlight Value Proposition</p>
                <p className="text-slate-400 text-xs">Emphasize unique amenities and exclusive location benefits.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}