export function validateEmail(email: string): { valid: boolean; message?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { valid: false, message: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain uppercase, lowercase, and a number',
    };
  }
  return { valid: true };
}

export function validatePhone(phone: string): { valid: boolean; message?: string } {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  if (!phone) {
    return { valid: false, message: 'Phone number is required' };
  }
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: 'Invalid phone number format' };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; message?: string } {
  if (!name) {
    return { valid: false, message: 'Name is required' };
  }
  if (name.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  return { valid: true };
}

export function validatePrice(price: number): { valid: boolean; message?: string } {
  if (price <= 0) {
    return { valid: false, message: 'Price must be greater than 0' };
  }
  if (price > 100000000) {
    return { valid: false, message: 'Price is too high' };
  }
  return { valid: true };
}

export function validateArea(area: number): { valid: boolean; message?: string } {
  if (area <= 0) {
    return { valid: false, message: 'Area must be greater than 0' };
  }
  return { valid: true };
}

export function validateRequired(value: string, fieldName: string): { valid: boolean; message?: string } {
  if (!value || value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true };
}