export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
  phone?: string;
  user_metadata?: {
    full_name?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  role: 'buyer' | 'seller';
}