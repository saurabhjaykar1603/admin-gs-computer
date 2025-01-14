import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProductsApi } from "@/services/product/productsApi";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filters = {
    page: 1,
    limit: 10,
  };

  for (const [key, value] of searchParams.entries()) {
    if (key === "page") {
      filters[key] = Number(value) || 1;
      continue;
    }
    if (value) (filters as Record<string, string | number>)[key] = value;
  }

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: ({ signal }) => getAllProductsApi(filters, signal),
  });
  const pageCount = Math.ceil(products?.total / filters.limit);

  if (filters.page && filters.page < pageCount) {
    const newFilters = { ...filters, page: filters.page + 1 };
    queryClient.prefetchQuery({
      queryKey: ["products", newFilters],
      queryFn: ({ signal }) => getAllProductsApi(newFilters, signal),
    });
  }

  if (filters.page && filters.page > 1) {
    const newFilters = { ...filters, page: filters.page - 1 };
    queryClient.prefetchQuery({
      queryKey: ["products", newFilters],
      queryFn: ({ signal }) => getAllProductsApi(newFilters, signal),
    });
  }

  return {
    products,
    isLoading,
    error,
    refetch,
    totalSize: products?.total ?? 0,
    pageCount,
  };
};
