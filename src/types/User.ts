export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  mobile: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  setUser: (
    user: User,
  ) => void;
  clearUser: () => void;
}
