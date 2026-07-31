import { supabase } from './supabase';
import { Appointment } from '@/types/appointment';

export async function getAppointments(userId: string, role: 'buyer' | 'seller'): Promise<Appointment[]> {
  const column = role === 'buyer' ? 'buyer_id' : 'seller_id';
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq(column, userId);

  if (error) {
    throw error;
  }

  return data as Appointment[];
}

export async function createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Appointment;
}

export async function updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Appointment;
}

export async function cancelAppointment(id: string): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', id);
  if (error) {
    throw error;
  }
}

export async function getUpcomingAppointments(userId: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('buyer_id', userId)
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data as Appointment[];
}