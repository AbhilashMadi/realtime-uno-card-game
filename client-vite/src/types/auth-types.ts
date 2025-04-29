export type LoginSchema = {
  username: string;
  password: string;
  remember: boolean;
};

export type RegisterSchema = {
  full_name: "";
  username: "";
  email: `${string}@${string}`;
  password: "";
  confirm_password: "";
};

export type UserSchema = {
  full_name: string;
  username: string;
  email: string;
  role: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};
