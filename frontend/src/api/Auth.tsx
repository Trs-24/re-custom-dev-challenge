import { AxiosInstance } from "axios";
import { UserRole } from "./User";

interface AuthResponse {
  access_token: string;
}

interface UserData {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

interface Auth {
  register: (data: UserData) => Promise<AuthResponse>;
  login: (data: Omit<UserData, "name">) => Promise<AuthResponse>;
}

export default class AuthAPI implements Auth {
  private request: AxiosInstance;

  constructor(request: AxiosInstance) {
    this.request = request;
  }

  async register(data: UserData) {
    return this.request
      .post("/auth/register", data)
      .then((res) => res.data) as Promise<AuthResponse>;
  }

  async login(data: Omit<UserData, "name">) {
    return this.request.post("/auth/login", data).then((res) => res.data) as Promise<AuthResponse>;
  }
}
