/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllProducts = async (
    page?: string,
    limit?: string,
    query?: { [key: string]: string | string[] | undefined }
  ) => {
    const params = new URLSearchParams();
  
    if (query?.price) {
      params.append("minPrice", "0");
      params.append("maxPrice", query?.price.toString());
    }
  
    if (query?.category) {
      params.append("categories", query?.category.toString());
    }
    if (query?.brand) {
      params.append("brands", query?.brand.toString());
    }
    if (query?.rating) {
      params.append("ratings", query?.rating.toString());
    }
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/products?limit=${limit}&page=${page}&${params}`,
        {
          next: {
            tags: ["PRODUCT"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };
  