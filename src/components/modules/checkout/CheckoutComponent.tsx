/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShippingAddress } from "@/redux/services/cartSlice";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TShippingAddress } from "@/types";
import { makeCheckout } from "@/services/OrderService";

const CheckoutComponent = () => {
  const [orderLoading, setOrderLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { products: cartItems, shippingAddress } = useAppSelector((state) => state.cart);


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TShippingAddress>({
    defaultValues: shippingAddress,
    mode: "onChange",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSaveAddress = (data: TShippingAddress) => {
    dispatch(setShippingAddress(data));
    toast.success("Shipping address saved");
  };

  const handlePlaceOrder = async (orderData: TShippingAddress) => {
    if (!isValid) {
      toast.error("Please fill in the required fields.");
      return;
    }
  
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
  
    handleSaveAddress(orderData);
  
    const formattedOrderData = {
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.orderQuantity,
        prescription: item.requiresPrescription || null,
      })),
      paymentMethod: "shurjo-pay",
      shippingAddress: orderData,
    };
  
    setOrderLoading(true); // Start loading
  
    try {
      const response = await makeCheckout(formattedOrderData);
      if (response.success) {
        toast.success("Order placed successfully!");
        if (response?.data) {
          setTimeout(() => {
            window.location.href = response.data;
          }, 500);
        }
      } else {
        toast.error(response.message || "Order failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setOrderLoading(false); // Stop loading
    }
  };
  
  

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.orderQuantity, 0);
  const discount = subtotal * 0; //* Example: discount
  const total = subtotal - discount;

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Shipping Address */}
        <form onSubmit={handleSubmit(handleSaveAddress)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-800">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(
                  [
                    { name: "fullName", label: "Your Full Name" },
                    { name: "address", label: "Address" },
                    { name: "city", label: "City" },
                    { name: "postalCode", label: "Postal Code" },
                    { name: "country", label: "Country" },
                    { name: "phone", label: "Phone Number" },
                  ] as Array<{ name: keyof TShippingAddress; label: string }>
                ).map(({ name, label }) => (
                  <div key={name}>
                    <Input
                      {...register(name, { required: `${label} is required` })}
                      placeholder={label}
                    />
                    {errors[name] && (
                      <p className="text-red-500 text-sm">{errors[name]?.message}</p>
                    )}
                  </div>
                ))}
              </div>
              <Button type="submit" className="w-full mt-4">
                Save Address
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* Right: Order Summary & Payment */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-800">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-3 text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">{subtotal.toFixed(2)} BDT</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-600">
                <span>Discount</span>
                <span className="font-semibold">-{discount.toFixed(2)} BDT</span>
              </div>
              <div className="flex justify-between text-lg font-semibold mt-4">
                <span>Total</span>
                <span>{total.toFixed(2)} BDT</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-800">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {["Shurjo Pay"].map((method) => (
                  <Button
                    key={method}
                    variant={paymentMethod === method ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Place Order Button */}
          <Button onClick={handleSubmit(handlePlaceOrder)} className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700" disabled={orderLoading}>
          {orderLoading ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
