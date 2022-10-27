export interface Project {
  name: string;
  namespace: string;
  secret: string;
  entry: string[];
  expire_time: null | Date;
  status: boolean;
}

/**
 * 用户信息
 */
export interface UserInfo {
  username: string;
  email: string;
  name: string;
  avatar: string;
  roles: string[];
  department?: string;
  feishu?: any;
  sessions: number;
  last_time: string;
  create_time: number;
}
