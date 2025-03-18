/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | boolean | undefined }
) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value.toString());
    });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products?limit=${limit || "10"}&page=${page || "1"}&${params.toString()}`,
      { cache: "no-store" }
    );
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

  
export const getProductBySlug = async (slug: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/product-slug/${slug}`, {
        next: {
          tags: ["PRODUCT"],
        },
      });
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };
  