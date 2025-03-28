/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const makeCheckout = async (orderData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("token")!.value,
        },
        body: JSON.stringify(orderData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const verifyOrder = async (orderId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/verify-payment?order_id=${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("token")?.value || "",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    return new Error(error.message || "Something went wrong!");
  }
};

