export interface Appointment {
  id: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  scheduledAt: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Complaint {
  id: string;
  userId: string;
  propertyId?: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentStats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}