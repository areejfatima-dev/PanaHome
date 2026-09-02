import { supabase } from './supabase';
import { User } from '@/types/user';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileRow {
  full_name: string;
  role: 'buyer' | 'seller' | 'admin';
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, role, phone, avatar_url, created_at')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.warn('fetchProfile:', error.message);
    return null;
  }

  return (data as ProfileRow) ?? null;
}

function toAppUser(authUser: SupabaseUser | null, profile: ProfileRow | null): User | null {
  if (!authUser) return null;

  return {
    id: authUser.id,
    email: authUser.email ?? '',
    fullName: profile?.full_name || authUser.user_metadata?.full_name || '',
    role: profile?.role ?? 'buyer',
    avatar: profile?.avatar_url || authUser.user_metadata?.avatar_url || undefined,
    phone: profile?.phone || authUser.user_metadata?.phone || undefined,
    createdAt: profile?.created_at || authUser.created_at,
    updatedAt: profile?.created_at || authUser.created_at,
  };
}

export async function signIn(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const profile = await fetchProfile(data.user.id);
  return toAppUser(data.user, profile);
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  phone?: string
): Promise<User | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone },
    },
  });

  if (error) {
    throw error;
  }

  if (!data.user) return null;

  const profile = await fetchProfile(data.user.id);
  return toAppUser(data.user, profile);
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await fetchProfile(user.id);
  return toAppUser(user, profile);
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(toAppUser(session?.user ?? null, null));
  });
}