"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Fix: Import useRouter
import { TProduct } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCart } from "@/redux/services/cartSlice";
import { toast } from "sonner";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter(); // ✅ Fix: use useRouter instead of useNavigate
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: TProduct) => {
    if (product.stock === 0) {
      toast.error("This product is out of stock!");
      return;
    }

    dispatch(addProductToCart({ ...product, orderQuantity: 1 }));
    router.push('/cart'); // ✅ Fix: Use router.push instead of navigate.push
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="relative">
      <Card className="rounded-md overflow-hidden py-0">
        <div className="relative">
          <Link href={`/products/${product.slug}`}>
            <Image
              height={300}
              width={300}
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </Link>
          {/* Stock Indicator */}
          <p
            className={`absolute top-2 right-2 text-white text-xs font-semibold px-3 py-1 rounded-md 
              ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <CardContent className="p-4">
          <Link href={`/products/${product.slug}`} className="text-lg font-semibold">
            {product.name}
          </Link>
          <p className="text-black font-bold mt-2">
            Price: <span className="text-primary">{product.price} BDT</span>
          </p>
          <div className="flex gap-2 mt-4">
            <Link href={`/checkout/${product._id}`}>
              <Button className="w-full bg-primary text-white">Buy Now</Button>
            </Link>
            <Button
              onClick={() => handleAddToCart(product)}
              variant="outline"
              className="w-1/2"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
