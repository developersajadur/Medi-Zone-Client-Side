import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import Link from "next/link";
import ProductCard from "../product/ProductCard";
import { getAllProducts } from "@/services/ProductService";

const HomeProducts = async () => {
  const { data: products } = await getAllProducts(undefined, "8");

  return (
    <div className="mt-5 lg:mt-10 mb-5 lg:mb-10">
      {/* Heading Section */}
      <div className="text-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-4xl font-semibold text-white lg:text-primary">
          Our Medicines Collection
        </h2>
        <p className="text-sm mt-2 max-w-3xl mx-auto text-white lg:text-gray-600">
          Explore our range of medicines for your health and wellness.
        </p>
      </div>

      {/* Product Grid */}
      <div className="w-full flex justify-center">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.products?.length > 0 ? (
            products.products.map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-white">
              No medicines found.
            </div>
          )}
        </div>
      </div>

      {/* View More Button (Only if there are 8 or more products) */}
      <div className="flex justify-center mt-6 lg:mt-10">
        {products?.products.length >= 8 && (
          <Link href="/products">
            <Button className="text-primary bg-secondary">View All Medicines</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
