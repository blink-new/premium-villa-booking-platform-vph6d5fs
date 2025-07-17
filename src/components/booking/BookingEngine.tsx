import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Star,
  Wifi,
  Car,
  Waves,
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  Shield,
  Clock
} from 'lucide-react'
import { Villa, BookingRequest } from '@/types/villa'
import { format } from 'date-fns'

interface BookingEngineProps {
  villa: Villa
  onBookingSubmit: (booking: BookingRequest) => void
}

export function BookingEngine({ villa, onBookingSubmit }: BookingEngineProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState(2)
  const [bookingForm, setBookingForm] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    special_requests: ''
  })
  const [totalPrice, setTotalPrice] = useState(0)
  const [nights, setNights] = useState(0)

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
      const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setNights(nightCount)
      setTotalPrice(nightCount * villa.price_per_night)
    }
  }, [checkInDate, checkOutDate, villa.price_per_night])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkInDate || !checkOutDate) return

    const booking: BookingRequest = {
      villa_id: villa.id,
      guest_name: bookingForm.guest_name,
      guest_email: bookingForm.guest_email,
      guest_phone: bookingForm.guest_phone,
      check_in: format(checkInDate, 'yyyy-MM-dd'),
      check_out: format(checkOutDate, 'yyyy-MM-dd'),
      guests,
      special_requests: bookingForm.special_requests
    }

    onBookingSubmit(booking)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % villa.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Villa Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-96">
                <img 
                  src={villa.images[currentImageIndex]} 
                  alt={villa.name}
                  className="w-full h-full object-cover"
                />
                {villa.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {villa.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Villa Info */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{villa.name}</h1>
                    <div className="flex items-center text-slate-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{villa.location}, {villa.city}, {villa.country}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span>{villa.max_guests} guests</span>
                      <span>{villa.bedrooms} bedrooms</span>
                      <span>{villa.bathrooms} bathrooms</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">4.9</span>
                      <span className="text-slate-500 ml-1">(127 reviews)</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Superhost</Badge>
                  </div>
                </div>

                <p className="text-slate-700 mb-6">{villa.description}</p>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {villa.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-slate-600">
                        <div className="w-5 h-5 flex items-center justify-center">
                          {amenity.includes('WiFi') && <Wifi className="w-4 h-4" />}
                          {amenity.includes('Pool') && <Waves className="w-4 h-4" />}
                          {amenity.includes('Parking') && <Car className="w-4 h-4" />}
                          {!amenity.includes('WiFi') && !amenity.includes('Pool') && !amenity.includes('Parking') && 
                            <Check className="w-4 h-4" />}
                        </div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Your Stay</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900">${villa.price_per_night}</span>
                    <span className="text-slate-500 text-sm ml-1">per night</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Date Selection */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="checkin">Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, "MMM dd") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="checkout">Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, "MMM dd") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                            disabled={(date) => date < (checkInDate || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="guests"
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                        min="1"
                        max={villa.max_guests}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={bookingForm.guest_name}
                        onChange={(e) => setBookingForm({...bookingForm, guest_name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingForm.guest_email}
                        onChange={(e) => setBookingForm({...bookingForm, guest_email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingForm.guest_phone}
                        onChange={(e) => setBookingForm({...bookingForm, guest_phone: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="requests">Special Requests</Label>
                      <Textarea
                        id="requests"
                        value={bookingForm.special_requests}
                        onChange={(e) => setBookingForm({...bookingForm, special_requests: e.target.value})}
                        placeholder="Any special requirements or requests..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  {checkInDate && checkOutDate && (
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${villa.price_per_night} × {nights} nights</span>
                        <span>${totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service fee</span>
                        <span>${Math.round(totalPrice * 0.1).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes</span>
                        <span>${Math.round(totalPrice * 0.08).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${Math.round(totalPrice * 1.18).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    disabled={!checkInDate || !checkOutDate || !bookingForm.guest_name || !bookingForm.guest_email}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Reserve Now
                  </Button>
                </form>

                {/* Trust Indicators */}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                    <span>Your payment information is secure</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Free cancellation within 24 hours</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    <span>Instant booking confirmation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}