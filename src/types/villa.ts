export interface Villa {
  id: string
  name: string
  description: string
  location: string
  city: string
  country: string
  price_per_night: number
  max_guests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: string[]
  owner_id: string
  status: 'active' | 'inactive' | 'maintenance'
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  villa_id: string
  user_id: string
  guest_name: string
  guest_email: string
  guest_phone?: string
  check_in: string
  check_out: string
  guests: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'pending' | 'paid' | 'refunded'
  special_requests?: string
  created_at: string
  updated_at: string
}

export interface VillaAvailability {
  id: string
  villa_id: string
  date: string
  available: boolean
  price_override?: number
  user_id: string
  created_at: string
}

export interface SearchFilters {
  city?: string
  check_in?: string
  check_out?: string
  guests?: number
  min_price?: number
  max_price?: number
  amenities?: string[]
}

export interface BookingRequest {
  villa_id: string
  guest_name: string
  guest_email: string
  guest_phone?: string
  check_in: string
  check_out: string
  guests: number
  special_requests?: string
}