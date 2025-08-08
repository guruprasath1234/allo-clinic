import { NextRequest, NextResponse } from 'next/server';

// Mock patient data (in real app, this would come from database)
let patients = [
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
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: patients
  });
}

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json();
    
    const newPatient = {
      id: patients.length + 1,
      ...patientData,
      status: 'active',
      registrationDate: new Date().toISOString().split('T')[0]
    };

    patients.push(newPatient);

    return NextResponse.json({
      success: true,
      data: newPatient,
      message: 'Patient registered successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error registering patient' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();
    
    const patientIndex = patients.findIndex(p => p.id === id);
    if (patientIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Patient not found' },
        { status: 404 }
      );
    }

    patients[patientIndex] = { ...patients[patientIndex], ...updateData };

    return NextResponse.json({
      success: true,
      data: patients[patientIndex],
      message: 'Patient updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error updating patient' },
      { status: 500 }
    );
  }
}