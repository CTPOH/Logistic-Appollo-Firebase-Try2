export interface User {
  id: string;
  username: string;
  role: 'admin' | 'manager' | 'staff';
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}