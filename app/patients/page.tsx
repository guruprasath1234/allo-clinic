'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Eye, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { Users } from "lucide-react";
import Link from 'next/link';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  emergencyContact: string;
  medicalHistory: string;
  status: 'active' | 'inactive';
  registrationDate: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  useEffect(() => {
    // Simulate API call
    setPatients([
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0123',
        address: '123 Main St, City, State 12345',
        dateOfBirth: '1985-03-15',
        gender: 'Male',
        emergencyContact: '+1-555-0124',
        medicalHistory: 'Hypertension, Diabetes Type 2',
        status: 'active',
        registrationDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Emily Johnson',
        email: 'emily.johnson@email.com',
        phone: '+1-555-0125',
        address: '456 Oak Ave, City, State 12345',
        dateOfBirth: '1992-07-22',
        gender: 'Female',
        emergencyContact: '+1-555-0126',
        medicalHistory: 'Allergic to penicillin',
        status: 'active',
        registrationDate: '2024-02-01'
      },
      {
        id: 3,
        name: 'Robert Davis',
        email: 'robert.davis@email.com',
        phone: '+1-555-0127',
        address: '789 Pine St, City, State 12345',
        dateOfBirth: '1978-11-08',
        gender: 'Male',
        emergencyContact: '+1-555-0128',
        medicalHistory: 'No known allergies',
        status: 'active',
        registrationDate: '2024-01-20'
      }
    ]);
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleAddPatient = () => {
    const patient: Patient = {
      id: patients.length + 1,
      ...newPatient,
      status: 'active',
      registrationDate: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, patient]);
    setNewPatient({
      name: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      emergencyContact: '',
      medicalHistory: ''
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
                <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
                <p className="text-sm text-gray-500">Manage patient records and information</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Register New Patient</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={newPatient.dateOfBirth}
                        onChange={(e) => setNewPatient({...newPatient, dateOfBirth: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => setNewPatient({...newPatient, gender: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={newPatient.emergencyContact}
                        onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                      placeholder="Enter full address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={newPatient.medicalHistory}
                      onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                      placeholder="Enter medical history, allergies, etc."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPatient}>
                    Register Patient
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {patient.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {patient.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {patient.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">DOB:</span>
                      <span className="ml-2 text-gray-900">{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Gender:</span>
                      <span className="ml-2 text-gray-900">{patient.gender}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Registered:</span>
                      <span className="ml-2 text-gray-900">{new Date(patient.registrationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {patient.medicalHistory && (
                    <div className="mt-2">
                      <span className="font-medium text-gray-600">Medical History:</span>
                      <span className="ml-2 text-gray-900">{patient.medicalHistory}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or add a new patient.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}