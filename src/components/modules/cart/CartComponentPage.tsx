"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeProductFromCart, updateProductQuantity } from "@/redux/services/cartSlice";
import Image from "next/image";
import { MdShoppingCart, MdOutlineDelete } from "react-icons/md";
import Link from "next/link";
import { toast } from "sonner";

const CartComponentPage = () => {
  const dispatch = useAppDispatch();
  const { products: cartItems } = useAppSelector((state) => state.cart);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeProductFromCart(productId));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (productId: string, type: "increase" | "decrease") => {
    dispatch(updateProductQuantity({ productId, type }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.orderQuantity, 0);
  const totalCost = subtotal;

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <MdShoppingCart className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-3xl font-semibold text-gray-600">Your Cart is Empty</h2>
          <p className="text-gray-500 mt-2">Looks like you haven’t added anything yet. Start shopping now!</p>
          <Link href="/products">
            <button className="mt-5 flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-md shadow-md hover:bg-primary-dark transition">
              <MdShoppingCart className="text-lg" /> Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-medium mb-4">{cartItems.length} Items</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center justify-between border-b p-4 mb-4">
                <div className="flex gap-4 items-center w-full md:w-auto">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg" />
                  <div className="w-full">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-blue-600 font-semibold">Price: {item.price.toFixed(2)} BDT</p>
                  </div>
                </div>
                <div className="flex flex-row-reverse md:flex-col items-center md:items-end gap-2">
                  <button onClick={() => handleRemoveItem(item._id)} className="text-red-500 text-xl">
                    <MdOutlineDelete />
                  </button>
                  <p className="text-lg font-semibold">{(item.price * item.orderQuantity).toFixed(2)} BDT</p>
                  <div className="flex items-center bg-gray-100 border rounded-md overflow-hidden">
                    <button onClick={() => handleQuantityChange(item._id, "decrease")} className="px-3 py-1 bg-gray-200">-</button>
                    <span className="px-4 font-semibold">{item.orderQuantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, "increase")} className="px-3 py-1 bg-gray-200">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Order Summary</h3>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold">{subtotal.toFixed(2)} BDT</span>
            </div>
            <div className="flex justify-between text-lg font-semibold mt-4">
              <span>Total</span>
              <span>{totalCost.toFixed(2)} BDT</span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout">
              <button className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponentPage;
