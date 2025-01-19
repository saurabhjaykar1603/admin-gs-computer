import { useQuery } from '@tanstack/react-query';
import { getProductByIdApi } from '@/services/product/productsApi';
import { useParams } from 'react-router-dom';

export const useProduct = () => {
    const { productId } = useParams();

    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductByIdApi(productId),
        enabled: !!productId,
    });
};