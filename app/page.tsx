'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, UserCog, Activity, Clock, TrendingUp, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  time: string;
  status: string;
}

interface DashboardStats {
  todayAppointments: number;
  totalPatients: number;
  activeDoctors: number;
  pendingAppointments: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    todayAppointments: 0,
    totalPatients: 0,
    activeDoctors: 0,
    pendingAppointments: 0
  });

  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch current logged-in user
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data?.email) {
          router.push('/auth/signin');
        } else {
          setUser(data);
        }
      });

    // Simulate API calls
    setStats({
      todayAppointments: 10,
      totalPatients: 20,
      activeDoctors: 8,
      pendingAppointments: 2
    });

    setRecentAppointments([
      { id: 1, patient: 'Suresh', doctor: 'Dr.Wilson', time: '09:00 AM', status: 'confirmed' },
      { id: 2, patient: 'Nickel', doctor: 'Dr. Michael', time: '10:30 AM', status: 'pending' },
      { id: 3, patient: 'Varun', doctor: 'Dr. Wilson', time: '11:15 AM', status: 'confirmed' },
      { id: 4, patient: 'Mahesh', doctor: 'Dr. James', time: '02:00 PM', status: 'confirmed' },
    ]);
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/signin');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MediCare Clinic</h1>
                <p className="text-sm text-gray-500">Front Desk Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user && <span className="text-sm text-gray-700">Hi, {user.name}</span>}
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                {new Date().toLocaleDateString('en-GB')}
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Quick Actions
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12 this month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.activeDoctors}</div>
              <p className="text-xs text-muted-foreground">
                Available today
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingAppointments}</div>
              <p className="text-xs text-muted-foreground">
                Need confirmation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/patients">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Manage Patients
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Register new patients and view patient records
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/doctors">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCog className="h-5 w-5 mr-2" />
                  Manage Doctors
                </CardTitle>
                <CardDescription className="text-green-100">
                  View doctor schedules and availability
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/appointments">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Appointments
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Schedule and manage appointments
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Latest appointment bookings and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment: any) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-500">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}