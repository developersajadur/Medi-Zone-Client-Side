import { TProduct } from "./product.type";


export interface TCartProduct extends TProduct {
    orderQuantity: number;
  }