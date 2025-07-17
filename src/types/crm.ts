export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  villa_interest: string
  check_in: string
  check_out: string
  guests: number
  budget: number
  status: 'hot' | 'warm' | 'cold' | 'booked' | 'lost'
  score: number
  source: string
  created_at: string
  last_contact: string
  notes: string
  ai_summary: string
  call_transcripts: CallTranscript[]
  interactions: Interaction[]
}

export interface CallTranscript {
  id: string
  lead_id: string
  duration: number
  transcript: string
  sentiment: 'positive' | 'neutral' | 'negative'
  key_points: string[]
  created_at: string
  agent_type: 'ai' | 'human'
}

export interface Interaction {
  id: string
  lead_id: string
  type: 'call' | 'whatsapp' | 'email' | 'form'
  content: string
  direction: 'inbound' | 'outbound'
  created_at: string
  agent_id?: string
}

export interface Analytics {
  total_leads: number
  conversion_rate: number
  avg_response_time: number
  hot_leads: number
  revenue_pipeline: number
  drop_off_reasons: { reason: string; count: number }[]
  intent_funnel: { stage: string; count: number }[]
}

export interface Agent {
  id: string
  name: string
  email: string
  role: 'admin' | 'agent' | 'manager'
  status: 'online' | 'offline' | 'busy'
  avatar: string
}