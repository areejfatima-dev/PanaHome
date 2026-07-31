import { supabase } from './supabase';
import { User } from '@/types/user';

export async function signIn(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data.user as unknown as User;
}

export async function signUp(
  email: string,
  password: string,
  fullName: string
): Promise<User | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    throw error;
  }

  return data.user as unknown as User;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function resetPassword(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user as unknown as User | null;
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user as unknown as User | null);
  });
}