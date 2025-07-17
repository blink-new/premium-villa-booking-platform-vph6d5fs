import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Plus,
  Edit,
  Trash2,
  Upload,
  MapPin,
  DollarSign,
  Users,
  Bed,
  Bath,
  Star,
  Eye,
  EyeOff
} from 'lucide-react'
import { Villa } from '@/types/villa'

interface VillaFormData {
  name: string
  description: string
  location: string
  city: string
  country: string
  price_per_night: number
  max_guests: number
  bedrooms: number
  bathrooms: number
  amenities: string
  images: string
}

export function VillaManagement() {
  const [showForm, setShowForm] = useState(false)
  const [editingVilla, setEditingVilla] = useState<Villa | null>(null)
  const [formData, setFormData] = useState<VillaFormData>({
    name: '',
    description: '',
    location: '',
    city: '',
    country: '',
    price_per_night: 0,
    max_guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: '',
    images: ''
  })

  // Mock villas data - in real app, fetch from database
  const [villas, setVillas] = useState<Villa[]>([
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
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const villaData: Villa = {
      id: editingVilla?.id || `villa_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      location: formData.location,
      city: formData.city,
      country: formData.country,
      price_per_night: formData.price_per_night,
      max_guests: formData.max_guests,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
      images: formData.images.split(',').map(i => i.trim()).filter(i => i),
      owner_id: 'current_user',
      status: 'active',
      created_at: editingVilla?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (editingVilla) {
      setVillas(villas.map(v => v.id === editingVilla.id ? villaData : v))
    } else {
      setVillas([...villas, villaData])
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      location: '',
      city: '',
      country: '',
      price_per_night: 0,
      max_guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: '',
      images: ''
    })
    setShowForm(false)
    setEditingVilla(null)
    
    alert(editingVilla ? 'Villa updated successfully!' : 'Villa added successfully!')
  }

  const handleEdit = (villa: Villa) => {
    setEditingVilla(villa)
    setFormData({
      name: villa.name,
      description: villa.description,
      location: villa.location,
      city: villa.city,
      country: villa.country,
      price_per_night: villa.price_per_night,
      max_guests: villa.max_guests,
      bedrooms: villa.bedrooms,
      bathrooms: villa.bathrooms,
      amenities: villa.amenities.join(', '),
      images: villa.images.join(', ')
    })
    setShowForm(true)
  }

  const handleDelete = (villaId: string) => {
    if (confirm('Are you sure you want to delete this villa?')) {
      setVillas(villas.filter(v => v.id !== villaId))
      alert('Villa deleted successfully!')
    }
  }

  const toggleStatus = (villaId: string) => {
    setVillas(villas.map(v => 
      v.id === villaId 
        ? { ...v, status: v.status === 'active' ? 'inactive' : 'active' }
        : v
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Villa Management</h1>
          <p className="text-slate-600">Add and manage your luxury villas</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Villa
        </Button>
      </div>

      {/* Add/Edit Villa Form */}
      {showForm && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingVilla ? 'Edit Villa' : 'Add New Villa'}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setShowForm(false)
                  setEditingVilla(null)
                  setFormData({
                    name: '',
                    description: '',
                    location: '',
                    city: '',
                    country: '',
                    price_per_night: 0,
                    max_guests: 2,
                    bedrooms: 1,
                    bathrooms: 1,
                    amenities: '',
                    images: ''
                  })
                }}
              >
                Cancel
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Villa Name *</label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Luxury Beachfront Villa"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                  <Input 
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Seminyak Beach"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                  <Input 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Seminyak"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                  <Input 
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    placeholder="Indonesia"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price per Night ($) *</label>
                  <Input 
                    type="number"
                    required
                    min="0"
                    value={formData.price_per_night}
                    onChange={(e) => setFormData({...formData, price_per_night: parseInt(e.target.value) || 0})}
                    placeholder="850"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Max Guests *</label>
                  <Input 
                    type="number"
                    required
                    min="1"
                    value={formData.max_guests}
                    onChange={(e) => setFormData({...formData, max_guests: parseInt(e.target.value) || 1})}
                    placeholder="8"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms *</label>
                  <Input 
                    type="number"
                    required
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value) || 1})}
                    placeholder="4"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bathrooms *</label>
                  <Input 
                    type="number"
                    required
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value) || 1})}
                    placeholder="4"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <Textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Stunning oceanfront villa with private beach access and infinity pool..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amenities (comma-separated)</label>
                <Input 
                  value={formData.amenities}
                  onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                  placeholder="Private Pool, Beach Access, WiFi, Air Conditioning"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image URLs (comma-separated)</label>
                <Textarea 
                  value={formData.images}
                  onChange={(e) => setFormData({...formData, images: e.target.value})}
                  placeholder="https://images.unsplash.com/photo-1571896349842-33c89424de2d, https://images.unsplash.com/photo-2..."
                  rows={2}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Use high-quality image URLs from Unsplash or other sources
                </p>
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                {editingVilla ? 'Update Villa' : 'Add Villa'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Villas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villas.map((villa) => (
          <Card key={villa.id} className="overflow-hidden">
            <div className="relative h-48">
              <img 
                src={villa.images[0] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d'} 
                alt={villa.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge 
                  className={villa.status === 'active' ? 'bg-green-500' : 'bg-red-500'}
                >
                  {villa.status}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-slate-900 mb-2">{villa.name}</h3>
              
              <div className="flex items-center text-slate-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{villa.location}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  <span>${villa.price_per_night}/night</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{villa.max_guests} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="w-3 h-3 mr-1" />
                  <span>{villa.bedrooms} beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-3 h-3 mr-1" />
                  <span>{villa.bathrooms} baths</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(villa)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleStatus(villa.id)}
                  >
                    {villa.status === 'active' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(villa.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {villas.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-slate-400 mb-4">
              <Upload className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600">No villas added yet</h3>
              <p className="text-slate-500">Click "Add New Villa" to get started</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">How to Add Villas & Configure APIs</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>1. Database Setup:</strong> Villas are stored in the Blink database. The system automatically creates tables when you add your first villa.</p>
            <p><strong>2. Image URLs:</strong> Use high-quality images from Unsplash or upload to Blink Storage and use the public URLs.</p>
            <p><strong>3. API Keys:</strong> Go to Settings → Secrets to add API keys for external services (payment, email, etc.)</p>
            <p><strong>4. Booking Engine:</strong> The system automatically handles availability and pricing based on your villa data.</p>
            <p><strong>5. AI Integration:</strong> The voice agent will automatically learn about your villas and can answer guest questions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}