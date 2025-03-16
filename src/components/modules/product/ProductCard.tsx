import React from "react";
import Link from "next/link";
import { TProduct } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative">
      <Card className="rounded-md overflow-hidden py-0">
        <div className="relative">
          <Link href={`/medicines/${product.slug}`}>
            <Image
              height={300}
              width={300}
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </Link>
          {/* Stock Indicator */}
          <p className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
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
              <Button className="w-full bg-primary text-white">
                Buy Now
              </Button>
            </Link>
            <Button variant="outline" className="w-1/2" disabled>
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
