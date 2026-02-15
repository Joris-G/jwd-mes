import { User } from "../../users/user.model";

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest{
    
}