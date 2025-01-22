import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductByIdApi } from '@/services/product/productsApi';
import { useParams } from 'react-router-dom';

interface Product {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any;
    _id: string;
    title: string;
    description: string;
    price: number;
    availability: boolean;
    images?: string[];
    features?: string[];
}

export const useProduct = (): UseQueryResult<Product, Error> => {
    const { productId } = useParams<{ productId: string }>();

    return useQuery<Product, Error>({
        queryKey: ['product', productId],
        queryFn: () => getProductByIdApi(productId!),
        enabled: !!productId, 
    });
};
