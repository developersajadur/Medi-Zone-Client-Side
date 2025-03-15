
export type TUser = {
    userId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    role: "customer" | "admin";
    iat?: number;
    exp?: number;
  }
