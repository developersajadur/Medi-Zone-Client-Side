

export type TProduct = {
    _id: string;
    slug: string
    name: string;
    image: string;
    description: string;
    price: number;
    stock: number;
    requiresPrescription: boolean;
    manufacturer: {
      name: string;
      address: string;
      contact: string;
    };
    expiryDate: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v?: number | string | undefined;
  }