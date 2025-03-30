

export type TUserInfo = {
    _id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'customer' | 'admin';
    isBlocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  };