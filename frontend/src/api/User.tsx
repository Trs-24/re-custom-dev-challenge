import { AxiosInstance } from "axios";

export enum ActivityStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

export enum ActivityAction {
  CREATE = "create",
  UPDATE = "update",
  DOWNLOAD_REPORT = "download_report",
  LOGIN = "login",
}

export enum UpdatedField {
  NAME = "name",
  EMAIL = "email",
  ROLE = "role",
  PASSWORD = "password",
}

export interface Activity {
  id: string;
  action: ActivityAction;
  status: ActivityStatus;
  updatedField?: UpdatedField;
  createdAt: Date;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  activity: Activity[];
}

export interface UserWithStatistics {
  user: User;
  totalLogins: number;
  totalDownloads: number;
}

interface IUser {
  getAll: () => Promise<User[]>;
  getOne: (id: string) => Promise<UserWithStatistics>;
  update: (id: string, data: Partial<User>) => Promise<User>;
  delete: (id: string) => Promise<User>;
}

export default class UserAPI implements IUser {
  private request: AxiosInstance;

  constructor(request: AxiosInstance) {
    this.request = request;
  }

  async getAll() {
    return this.request.get("/user").then((res) => res.data) as Promise<User[]>;
  }

  async getOne(id: string) {
    return this.request.get(`/user/${id}`).then((res) => res.data) as Promise<UserWithStatistics>;
  }

  async update(id: string, data: Partial<User>) {
    return this.request.patch(`/user/${id}`, data).then((res) => res.data) as Promise<User>;
  }

  async delete(id: string) {
    return this.request.delete(`/user/${id}`).then((res) => res.data) as Promise<User>;
  }
}
