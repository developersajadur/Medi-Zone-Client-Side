"use client";

import { TProduct } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/modules/product/ProductCard";
import { getAllProducts } from "@/services/ProductService";
import { brandOptions, categoryOptions } from "@/utils/product.utils";
import { PackageSearch } from "lucide-react";
import Loader from "@/components/Loaders/Loader";

type FormData = {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  availability: string;
};

const AllProducts = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";

  const { register, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      category: "all",
      brand: "all",
      minPrice: "",
      maxPrice: "",
      availability: "all",
    },
  });

  const [query, setQuery] = useState<{ name: string; value: string | boolean }[]>([]);

  useEffect(() => {
    if (searchQuery) {
      setQuery([{ name: "search", value: searchQuery }]);
    } else {
      setQuery([]);
    }
  }, [searchQuery]);

  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      const data = await getAllProducts(
        undefined,
        undefined,
        Object.fromEntries(query.map(({ name, value }) => [name, value]))
      );
      setProducts(data?.data?.products || []);
      setLoading(false); // Set loading to false after fetching
    };
    fetchProducts();
  }, [query]);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const { minPrice, maxPrice, ...otherFilters } = formData;
    const newQuery: { name: string; value: string | boolean }[] = [];

    Object.entries(otherFilters).forEach(([key, value]) => {
      if (value !== "all" && value !== "") {
        if (key === "availability") {
          newQuery.push({ name: "inStock", value: value === "available" });
        } else {
          newQuery.push({ name: key, value });
        }
      }
    });

    if (minPrice) newQuery.push({ name: "minPrice", value: String(parseFloat(minPrice)) });
    if (maxPrice) newQuery.push({ name: "maxPrice", value: String(parseFloat(maxPrice)) });

    if (searchQuery) newQuery.push({ name: "search", value: searchQuery });

    setQuery(newQuery);
  };

  const handleClear = () => {
    reset();
    setQuery([]);
    router.push("/products");
  };

  return (
    <div className="mt-3 lg:mt-4 mb-5 lg:mb-5">
      <h2 className="text-2xl lg:text-4xl text-center font-semibold text-primary mb-5">
        All Available Medicine
      </h2>

      {/* Filter Bar */}
      <div className="w-full p-4 border rounded-md z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Category Select */}
          <Select onValueChange={(value) => setValue("category", value)} defaultValue="">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand Select */}
          <Select onValueChange={(value) => setValue("brand", value)} defaultValue="">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {brandOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="flex gap-2 w-full md:w-auto">
            <Input type="number" placeholder="Min Price" {...register("minPrice")} className="w-full md:w-[120px]" />
            <Input type="number" placeholder="Max Price" {...register("maxPrice")} className="w-full md:w-[120px]" />
          </div>

          {/* Availability Select */}
          <Select onValueChange={(value) => setValue("availability", value)} defaultValue="">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          {/* Submit & Clear Buttons */}
          <Button type="submit" className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white">
            Apply Filters
          </Button>
          <Button type="button" onClick={handleClear} className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white">
            Clear
          </Button>
        </form>
      </div>

      {/* Product Grid */}
<div className="w-full flex justify-center mt-6">
  {loading ? (
        <Loader/>
  ) : products.length ? (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product: TProduct) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-6">
    <PackageSearch className="w-12 h-12 text-gray-400" />
    <p className="text-lg font-medium mt-2">No products found</p>
    <p className="text-sm text-gray-500">Try adjusting your filters or searching with a different term.</p>
  </div>
  )}
</div>

    </div>
  );
};

export default AllProducts;
