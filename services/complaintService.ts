import { supabase } from './supabase';
import { Complaint } from '@/types/appointment';

export async function getComplaints(userId?: string): Promise<Complaint[]> {
  let query = supabase.from('complaints').select('*');
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as Complaint[];
}

export async function createComplaint(complaint: Partial<Complaint>): Promise<Complaint> {
  const { data, error } = await supabase
    .from('complaints')
    .insert(complaint)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Complaint;
}

export async function updateComplaintStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('complaints')
    .update({ status })
    .eq('id', id);
  if (error) {
    throw error;
  }
}