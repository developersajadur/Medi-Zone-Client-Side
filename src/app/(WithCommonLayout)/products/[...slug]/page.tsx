import ProductDetails from "@/components/modules/product/ProductDetails";
import { getProductBySlug } from "@/services/ProductService";
import { TProduct } from "@/types";
import Link from "next/link";
import React from "react";
import { IoWarningOutline } from "react-icons/io5";

const ProductDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const productDetails = await getProductBySlug(params?.slug);
  const product: TProduct = productDetails?.data;
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-700">
        <IoWarningOutline className="text-red-500 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold">Oops! Product not found.</h2>
        <p className="text-gray-500 mt-2 mb-6">
          The product you are looking for might be unavailable or does not exist.
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition">
            🔙 Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
