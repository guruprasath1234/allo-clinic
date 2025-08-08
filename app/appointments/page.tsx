'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Eye, ArrowLeft, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import Link from 'next/link';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
    duration: '30',
    type: '',
    notes: ''
  });

  useEffect(() => {
    // Simulate API call
    setAppointments([
      {
        id: 1,
        patientName: 'John Smith',
        doctorName: 'Dr. Sarah Wilson',
        date: '2024-01-15',
        time: '09:00',
        duration: 30,
        type: 'Consultation',
        status: 'confirmed',
        notes: 'Regular checkup'
      },
      {
        id: 2,
        patientName: 'Emily Johnson',
        doctorName: 'Dr. Michael Chen',
        date: '2024-01-15',
        time: '10:30',
        duration: 45,
        type: 'Follow-up',
        status: 'pending',
        notes: 'Follow-up for previous treatment'
      },
      {
        id: 3,
        patientName: 'Robert Davis',
        doctorName: 'Dr. Sarah Wilson',
        date: '2024-01-15',
        time: '11:15',
        duration: 30,
        type: 'Consultation',
        status: 'confirmed',
        notes: 'First visit'
      },
      {
        id: 4,
        patientName: 'Lisa Martinez',
        doctorName: 'Dr. James Brown',
        date: '2024-01-15',
        time: '14:00',
        duration: 60,
        type: 'Treatment',
        status: 'confirmed',
        notes: 'Physical therapy session'
      },
      {
        id: 5,
        patientName: 'David Wilson',
        doctorName: 'Dr. Lisa Martinez',
        date: '2024-01-16',
        time: '09:30',
        duration: 30,
        type: 'Consultation',
        status: 'pending',
        notes: 'Skin condition examination'
      }
    ]);
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddAppointment = () => {
    const appointment: Appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      duration: parseInt(newAppointment.duration),
      status: 'pending'
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({
      patientName: '',
      doctorName: '',
      date: '',
      time: '',
      duration: '30',
      type: '',
      notes: ''
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
                <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
                <p className="text-sm text-gray-500">Schedule and manage patient appointments</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Patient</Label>
                      <Select onValueChange={(value) => setNewAppointment({...newAppointment, patientName: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="John Smith">John Smith</SelectItem>
                          <SelectItem value="Emily Johnson">Emily Johnson</SelectItem>
                          <SelectItem value="Robert Davis">Robert Davis</SelectItem>
                          <SelectItem value="Lisa Martinez">Lisa Martinez</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="doctorName">Doctor</Label>
                      <Select onValueChange={(value) => setNewAppointment({...newAppointment, doctorName: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                          <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                          <SelectItem value="Dr. James Brown">Dr. James Brown</SelectItem>
                          <SelectItem value="Dr. Lisa Martinez">Dr. Lisa Martinez</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Select onValueChange={(value) => setNewAppointment({...newAppointment, duration: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Consultation">Consultation</SelectItem>
                          <SelectItem value="Follow-up">Follow-up</SelectItem>
                          <SelectItem value="Treatment">Treatment</SelectItem>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      placeholder="Additional notes or special instructions"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAppointment}>
                    Book Appointment
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
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Appointments</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Stethoscope className="h-3 w-3 mr-1" />
                          {appointment.doctorName}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {appointment.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
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
                      <span className="font-medium text-gray-600">Type:</span>
                      <span className="ml-2 text-gray-900">{appointment.type}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-600">Notes:</span>
                      <span className="ml-2 text-gray-900">{appointment.notes || 'No notes'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or book a new appointment.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}