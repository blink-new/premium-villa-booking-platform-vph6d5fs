import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Waves,
  Calendar,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Shield,
  Award
} from 'lucide-react'

interface VillaDetailsProps {
  villaId: string
  onBack: () => void
}

interface BookingForm {
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  specialRequests: string
}

export function VillaDetails({ villaId, onBack }: VillaDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    specialRequests: ''
  })

  // Mock villa data - in real app, fetch by villaId
  const villa = {
    id: villaId,
    name: 'Luxury Beachfront Villa',
    location: 'Seminyak, Bali',
    description: 'Experience the ultimate in luxury at this stunning beachfront villa. With panoramic ocean views, private beach access, and world-class amenities, this property offers an unforgettable escape. The villa features contemporary Balinese architecture, infinity pool, and personalized concierge service.',
    price: 850,
    rating: 4.9,
    reviews: 127,
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'
    ],
    amenities: [
      'Private Pool',
      'Beach Access',
      'WiFi',
      'Air Conditioning',
      'Kitchen',
      'Parking',
      'Concierge Service',
      'Daily Housekeeping',
      'Security',
      'Garden',
      'Terrace',
      'BBQ Area'
    ],
    features: [
      'Infinity pool overlooking the ocean',
      'Private beach access with loungers',
      'Fully equipped modern kitchen',
      'Spacious living areas with ocean views',
      'Master suite with private balcony',
      '24/7 concierge and security service'
    ]
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % villa.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Guest booking submitted:', bookingForm)
    alert('Booking request submitted! We will contact you shortly to confirm your reservation.')
    setShowBookingForm(false)
  }

  const calculateNights = () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 0
    const checkIn = new Date(bookingForm.checkIn)
    const checkOut = new Date(bookingForm.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const totalPrice = calculateNights() * villa.price

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Villa Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{villa.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-slate-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                <span className="font-medium">{villa.rating}</span>
                <span className="ml-1">({villa.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{villa.location}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">${villa.price}</p>
              <p className="text-slate-600">per night</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <img 
                  src={villa.images[currentImageIndex]} 
                  alt={villa.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {villa.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Villa Info */}
            <div className="space-y-8">
              {/* Basic Info */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Villa Details</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-slate-400 mr-2" />
                    <span>{villa.guests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 text-slate-400 mr-2" />
                    <span>{villa.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 text-slate-400 mr-2" />
                    <span>{villa.bathrooms} bathrooms</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">About this villa</h2>
                <p className="text-slate-600 leading-relaxed">{villa.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {villa.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {villa.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      <span className="text-slate-600 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-slate-200">
              <CardContent className="p-6">
                {!showBookingForm ? (
                  <div>
                    <div className="text-center mb-6">
                      <p className="text-2xl font-bold text-slate-900">${villa.price}</p>
                      <p className="text-slate-600">per night</p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Check-in</label>
                          <Input 
                            type="date" 
                            value={bookingForm.checkIn}
                            onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Check-out</label>
                          <Input 
                            type="date" 
                            value={bookingForm.checkOut}
                            onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Guests</label>
                        <Input 
                          type="number" 
                          min="1" 
                          max={villa.guests}
                          value={bookingForm.guests}
                          onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value) || 1})}
                        />
                      </div>
                    </div>

                    {calculateNights() > 0 && (
                      <div className="border-t border-slate-200 pt-4 mb-6">
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span>${villa.price} × {calculateNights()} nights</span>
                          <span>${totalPrice}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-slate-900">
                          <span>Total</span>
                          <span>${totalPrice}</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                      disabled={!bookingForm.checkIn || !bookingForm.checkOut}
                    >
                      Book Now - Guest Checkout
                    </Button>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-slate-600">
                        <Shield className="w-4 h-4 mr-2 text-green-600" />
                        <span>No account required</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Award className="w-4 h-4 mr-2 text-blue-600" />
                        <span>Instant confirmation</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Guest Details</h3>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowBookingForm(false)}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                      <Input 
                        required
                        value={bookingForm.guestName}
                        onChange={(e) => setBookingForm({...bookingForm, guestName: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <Input 
                        type="email"
                        required
                        value={bookingForm.guestEmail}
                        onChange={(e) => setBookingForm({...bookingForm, guestEmail: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <Input 
                        type="tel"
                        value={bookingForm.guestPhone}
                        onChange={(e) => setBookingForm({...bookingForm, guestPhone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Special Requests</label>
                      <Textarea 
                        value={bookingForm.specialRequests}
                        onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                        placeholder="Any special requests or requirements..."
                        rows={3}
                      />
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <div className="text-sm text-slate-600 mb-4">
                        <p><strong>Dates:</strong> {bookingForm.checkIn} to {bookingForm.checkOut}</p>
                        <p><strong>Guests:</strong> {bookingForm.guests}</p>
                        <p><strong>Total:</strong> ${totalPrice} ({calculateNights()} nights)</p>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
                    >
                      Submit Booking Request
                    </Button>

                    <p className="text-xs text-slate-500 text-center">
                      By submitting, you agree to our terms and conditions. 
                      We'll contact you to confirm your booking.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}