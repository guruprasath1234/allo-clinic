'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Eye, ArrowLeft, Phone, Mail, Clock, Stethoscope } from 'lucide-react';
import Link from 'next/link';

interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  qualifications: string;
  workingHours: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  patientsToday: number;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    qualifications: '',
    workingHours: ''
  });

  useEffect(() => {
    // Simulate API call
    setDoctors([
      {
        id: 1,
        name: 'Dr. Sarah Wilson',
        email: 'sarah.wilson@clinic.com',
        phone: '+1-555-0201',
        specialization: 'Cardiology',
        experience: 12,
        qualifications: 'MD, FACC',
        workingHours: '9:00 AM - 5:00 PM',
        status: 'available',
        rating: 4.8,
        patientsToday: 8
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        email: 'michael.chen@clinic.com',
        phone: '+1-555-0202',
        specialization: 'Pediatrics',
        experience: 8,
        qualifications: 'MD, FAAP',
        workingHours: '8:00 AM - 4:00 PM',
        status: 'busy',
        rating: 4.9,
        patientsToday: 12
      },
      {
        id: 3,
        name: 'Dr. James Brown',
        email: 'james.brown@clinic.com',
        phone: '+1-555-0203',
        specialization: 'Orthopedics',
        experience: 15,
        qualifications: 'MD, FAAOS',
        workingHours: '10:00 AM - 6:00 PM',
        status: 'available',
        rating: 4.7,
        patientsToday: 6
      },
      {
        id: 4,
        name: 'Dr. Lisa Martinez',
        email: 'lisa.martinez@clinic.com',
        phone: '+1-555-0204',
        specialization: 'Dermatology',
        experience: 10,
        qualifications: 'MD, FAAD',
        workingHours: '9:00 AM - 3:00 PM',
        status: 'offline',
        rating: 4.6,
        patientsToday: 0
      }
    ]);
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddDoctor = () => {
    const doctor: Doctor = {
      id: doctors.length + 1,
      ...newDoctor,
      experience: parseInt(newDoctor.experience),
      status: 'available',
      rating: 4.5,
      patientsToday: 0
    };
    setDoctors([...doctors, doctor]);
    setNewDoctor({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      qualifications: '',
      workingHours: ''
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doctor Management</h1>
                <p className="text-sm text-gray-500">Manage doctor profiles and schedules</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Doctor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Doctor</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                        placeholder="Dr. John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newDoctor.email}
                        onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                        placeholder="doctor@clinic.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newDoctor.phone}
                        onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                        placeholder="+1-555-0000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select onValueChange={(value) => setNewDoctor({...newDoctor, specialization: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="General Medicine">General Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={newDoctor.experience}
                        onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="workingHours">Working Hours</Label>
                      <Input
                        id="workingHours"
                        value={newDoctor.workingHours}
                        onChange={(e) => setNewDoctor({...newDoctor, workingHours: e.target.value})}
                        placeholder="9:00 AM - 5:00 PM"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Input
                      id="qualifications"
                      value={newDoctor.qualifications}
                      onChange={(e) => setNewDoctor({...newDoctor, qualifications: e.target.value})}
                      placeholder="MD, Board Certifications"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDoctor}>
                    Add Doctor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors by name, specialization, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Stethoscope className="h-3 w-3 mr-1" />
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(doctor.status)}>
                    {doctor.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {doctor.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {doctor.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {doctor.workingHours}
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{doctor.experience} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{doctor.rating}/5.0 ⭐</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Patients Today:</span>
                      <span className="font-medium">{doctor.patientsToday}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-2">Qualifications:</p>
                    <p className="text-sm text-gray-700">{doctor.qualifications}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or add a new doctor.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}