import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { 
  Home, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Edit,
  Eye,
  MoreVertical,
  MapPin,
  Star,
  Bed,
  Bath,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { Villa, Booking } from '@/types/villa'

export function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [villas, setVillas] = useState<Villa[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockVillas: Villa[] = [
      {
        id: 'villa_1',
        name: 'Luxury Beachfront Villa',
        description: 'Stunning oceanfront villa with private beach access',
        location: 'Seminyak Beach',
        city: 'Seminyak',
        country: 'Indonesia',
        price_per_night: 850,
        max_guests: 8,
        bedrooms: 4,
        bathrooms: 4,
        amenities: ['Private Pool', 'Beach Access', 'WiFi', 'Air Conditioning'],
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d'],
        owner_id: 'owner_1',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
      },
      {
        id: 'villa_2',
        name: 'Mountain Retreat Chalet',
        description: 'Cozy mountain chalet with panoramic views',
        location: 'Aspen Highlands',
        city: 'Aspen',
        country: 'USA',
        price_per_night: 1200,
        max_guests: 10,
        bedrooms: 5,
        bathrooms: 4,
        amenities: ['Ski Access', 'Fireplace', 'Hot Tub', 'WiFi'],
        images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000'],
        owner_id: 'owner_2',
        status: 'active',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
      }
    ]

    const mockBookings: Booking[] = [
      {
        id: 'booking_1',
        villa_id: 'villa_1',
        user_id: 'guest_1',
        guest_name: 'John Smith',
        guest_email: 'john.smith@email.com',
        guest_phone: '+1 (555) 111-2222',
        check_in: '2024-06-15',
        check_out: '2024-06-22',
        guests: 4,
        total_amount: 5950,
        status: 'confirmed',
        payment_status: 'paid',
        created_at: '2024-01-10T00:00:00Z',
        updated_at: '2024-01-10T00:00:00Z'
      },
      {
        id: 'booking_2',
        villa_id: 'villa_2',
        user_id: 'guest_2',
        guest_name: 'Lisa Johnson',
        guest_email: 'lisa.j@email.com',
        check_in: '2024-07-01',
        check_out: '2024-07-08',
        guests: 6,
        total_amount: 8400,
        status: 'pending',
        payment_status: 'pending',
        created_at: '2024-01-12T00:00:00Z',
        updated_at: '2024-01-12T00:00:00Z'
      }
    ]

    setVillas(mockVillas)
    setBookings(mockBookings)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const totalRevenue = bookings.reduce((sum, booking) => 
    booking.payment_status === 'paid' ? sum + booking.total_amount : sum, 0
  )

  const occupancyRate = 75 // Mock calculation

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Header */}
      <div className="relative border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Villa Admin
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Villa
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback className="bg-slate-700 text-slate-300">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="villas" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Home className="w-4 h-4 mr-2" />
              Villas
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Villas</p>
                      <p className="text-2xl font-bold text-white">{villas.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Home className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2 this month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Bookings</p>
                      <p className="text-2xl font-bold text-white">{bookings.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Revenue</p>
                      <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +22% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-white">{occupancyRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +5% from last month
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => {
                    const villa = villas.find(v => v.id === booking.villa_id)
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.guest_name}`} />
                            <AvatarFallback className="bg-slate-700 text-slate-300">
                              {booking.guest_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{booking.guest_name}</p>
                            <p className="text-sm text-slate-400">{villa?.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white font-medium">${booking.total_amount.toLocaleString()}</p>
                            <p className="text-sm text-slate-400">{booking.check_in} - {booking.check_out}</p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="villas">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Villa Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {villas.map((villa) => (
                    <Card key={villa.id} className="bg-slate-800/30 border-slate-700/30 overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={villa.images[0]} 
                          alt={villa.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={villa.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {villa.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-2">{villa.name}</h3>
                        <div className="flex items-center text-slate-400 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{villa.city}, {villa.country}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{villa.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{villa.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{villa.max_guests}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white">${villa.price_per_night}</p>
                            <p className="text-xs text-slate-400">per night</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-green-400">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Booking Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const villa = villas.find(v => v.id === booking.villa_id)
                    return (
                      <div key={booking.id} className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.guest_name}`} />
                              <AvatarFallback className="bg-slate-700 text-slate-300">
                                {booking.guest_name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-white">{booking.guest_name}</p>
                              <p className="text-sm text-slate-400">{booking.guest_email}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-slate-400 text-sm">Villa</p>
                            <p className="text-white">{villa?.name}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-sm">Dates</p>
                            <p className="text-white">{booking.check_in} - {booking.check_out}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-sm">Guests</p>
                            <p className="text-white">{booking.guests} guests</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-400 text-sm">Total Amount</p>
                            <p className="text-xl font-bold text-white">${booking.total_amount.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                              View Details
                            </Button>
                            {booking.status === 'pending' && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  Confirm
                                </Button>
                                <Button variant="outline" size="sm" className="border-red-500 text-red-400 hover:bg-red-500/10">
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-slate-700"
                  />
                </CardContent>
              </Card>
              
              <div className="lg:col-span-2">
                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Bookings for {selectedDate?.toDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.filter(booking => {
                        const checkIn = new Date(booking.check_in)
                        const checkOut = new Date(booking.check_out)
                        return selectedDate && selectedDate >= checkIn && selectedDate <= checkOut
                      }).map((booking) => {
                        const villa = villas.find(v => v.id === booking.villa_id)
                        return (
                          <div key={booking.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-white">{booking.guest_name}</p>
                                <p className="text-sm text-slate-400">{villa?.name}</p>
                              </div>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                      {bookings.filter(booking => {
                        const checkIn = new Date(booking.check_in)
                        const checkOut = new Date(booking.check_out)
                        return selectedDate && selectedDate >= checkIn && selectedDate <= checkOut
                      }).length === 0 && (
                        <p className="text-slate-400 text-center py-8">No bookings for this date</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}