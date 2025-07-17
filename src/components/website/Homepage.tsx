import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar,
  Star,
  Wifi,
  Car,
  Waves,
  Mountain,
  TreePine,
  ChevronRight,
  Play,
  Award,
  Shield,
  Clock
} from 'lucide-react'

interface SearchFormData {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
}

interface HomepageProps {
  onVillaSelect: (villaId: string) => void
}

export function Homepage({ onVillaSelect }: HomepageProps) {
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  })

  const featuredCities = [
    {
      name: 'Bali, Indonesia',
      properties: 45,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1',
      icon: <Waves className="w-5 h-5" />
    },
    {
      name: 'Aspen, USA',
      properties: 23,
      image: 'https://images.unsplash.com/photo-1551524164-6cf2ac531400',
      icon: <Mountain className="w-5 h-5" />
    },
    {
      name: 'Tuscany, Italy',
      properties: 38,
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
      icon: <TreePine className="w-5 h-5" />
    },
    {
      name: 'Santorini, Greece',
      properties: 29,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      icon: <Waves className="w-5 h-5" />
    }
  ]

  const featuredVillas = [
    {
      id: 'villa_1',
      name: 'Luxury Beachfront Villa',
      location: 'Seminyak, Bali',
      price: 850,
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      amenities: ['Private Pool', 'Beach Access', 'WiFi'],
      guests: 8,
      bedrooms: 4
    },
    {
      id: 'villa_2',
      name: 'Mountain Retreat Chalet',
      location: 'Aspen, Colorado',
      price: 1200,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      amenities: ['Ski Access', 'Hot Tub', 'Fireplace'],
      guests: 10,
      bedrooms: 5
    },
    {
      id: 'villa_3',
      name: 'Tuscan Countryside Villa',
      location: 'Chianti, Italy',
      price: 650,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      amenities: ['Wine Cellar', 'Garden', 'Pool'],
      guests: 12,
      bedrooms: 6
    }
  ]

  const handleSearch = () => {
    console.log('Search:', searchForm)
    // Navigate to search results
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">VillaLux</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Destinations</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Experiences</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                Guest Checkout Available
              </Badge>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Sign In (Optional)
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                List Your Villa
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Luxury Villa
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the world's most exclusive villas with personalized service, 
              premium amenities, and unforgettable memories.
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Where to?"
                    value={searchForm.destination}
                    onChange={(e) => setSearchForm({...searchForm, destination: e.target.value})}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="date"
                    placeholder="Check in"
                    value={searchForm.checkIn}
                    onChange={(e) => setSearchForm({...searchForm, checkIn: e.target.value})}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="date"
                    placeholder="Check out"
                    value={searchForm.checkOut}
                    onChange={(e) => setSearchForm({...searchForm, checkOut: e.target.value})}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500"
                  />
                </div>
                
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="number"
                    placeholder="Guests"
                    value={searchForm.guests}
                    onChange={(e) => setSearchForm({...searchForm, guests: parseInt(e.target.value) || 0})}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500"
                    min="1"
                    max="20"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full mt-4 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Luxury Villas
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Destinations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our handpicked collection of luxury villas in the world's most desirable locations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCities.map((city, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-48">
                  <img 
                    src={city.image} 
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      {city.icon}
                      <span className="ml-2 font-medium">{city.name}</span>
                    </div>
                    <p className="text-sm text-white/80">{city.properties} properties</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Villas */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Luxury Villas</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover our most exclusive properties, carefully selected for their exceptional quality and unique experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVillas.map((villa) => (
              <Card 
                key={villa.id} 
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => onVillaSelect(villa.id)}
              >
                <div className="relative h-64">
                  <img 
                    src={villa.image} 
                    alt={villa.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white">
                      <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                      {villa.rating}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute bottom-4 left-4 bg-white/90 text-slate-900 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Virtual Tour
                  </Button>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {villa.name}
                    </h3>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">${villa.price}</p>
                      <p className="text-sm text-slate-500">per night</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-slate-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{villa.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <span>{villa.guests} guests</span>
                    <span>{villa.bedrooms} bedrooms</span>
                    <span>{villa.reviews} reviews</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {villa.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => onVillaSelect(villa.id)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Verified Properties</h3>
              <p className="text-slate-600">Every villa is personally inspected and verified by our expert team</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">24/7 Concierge</h3>
              <p className="text-slate-600">Round-the-clock support and personalized assistance during your stay</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Best Price Guarantee</h3>
              <p className="text-slate-600">We guarantee the best rates for all our luxury villa bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Mountain className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">VillaLux</span>
              </div>
              <p className="text-slate-400 mb-4">
                Discover the world's most exclusive luxury villas with personalized service and unforgettable experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Bali</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tuscany</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aspen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Santorini</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 VillaLux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}