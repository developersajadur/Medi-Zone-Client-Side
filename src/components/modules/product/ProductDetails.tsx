"use client";


import { TProduct } from "@/types";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const ProductDetails = ({ product }: { product: TProduct }) => {

  const handleSaveProductOnLocalStorage = (product: TProduct) => {
    const cartItems = JSON.parse(localStorage.getItem("cart-items") || "[]");

    const existingProduct = cartItems.find((item: TProduct) => item._id === product._id);
    if (existingProduct) {
      toast.error("You have already added this product!");
      return;
    }
    cartItems.push({ ...product, orderQuantity: 1 });
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    toast.success("Product added to cart successfully!");
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 mt-5 lg:mt-10 mb-5 lg:mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="relative">
          <div className="flex items-center justify-center w-full bg-gray-100 overflow-hidden rounded-md">
            <Image
              src={product?.image}
              alt={product?.name}
              width={400}
              height={400}
              className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          <h1 className="text-[1.6rem] md:text-[1.8rem] text-gray-800 font-semibold mb-3">{product?.name}</h1>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Manufacturer:</span> {product?.manufacturer?.name}
          </div>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Categories:</span> {product?.slug}
          </div>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Stock Available:</span> {product?.stock} pcs
          </div>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Expiry Date:</span> {new Date(product?.expiryDate).toDateString()}
          </div>

          {product?.requiresPrescription && (
            <div className="text-red-600 mb-3 font-semibold">⚠️ This medicine requires a prescription.</div>
          )}
          <h2 className="text-[1.4rem] font-semibold text-gray-800 mb-4">Price: {product?.price} BDT</h2>

          <div className="border-t-[2px] border-gray-200 border-dashed mt-1 pt-6">
            <h2 className="text-gray-700 font-semibold mb-2">Description:</h2>
            <p className="text-[0.9rem] text-gray-600">{product?.description}</p>
          </div>

          <div className="mt-auto flex flex-col md:flex-row gap-4">
            <button
              disabled={product?.stock === 0}
              onClick={() => handleSaveProductOnLocalStorage(product)}
              className="py-3 px-6 bg-secondary text-white hover:bg-primary hover:text-secondary rounded-md"
            >
              🛒 Add To Cart
            </button>
            <Link href={`/checkout/${product?._id}`}>
              <button className="grow py-3 px-6 border bg-transparent border-gray-300 text-primary hover:bg-gray-100 rounded-md">
                Checkout Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
