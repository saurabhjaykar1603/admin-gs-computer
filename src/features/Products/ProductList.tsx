import React, { useEffect } from 'react'

const ProductList = ({ productData, isProductDataLoading, isProductDataError, pageCount, totalSize }) => {

    useEffect(() => {
        if (isProductDataError) {
            throw new Error("Something went wrong.")
        }
    }, [isProductDataError]);


    if (isProductDataLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    console.log(pageCount);
    console.log(totalSize);

    return (
        <div>
            {
                productData?.length > 0 ? productData?.map((product) => {
                    return (
                        <div key={product?._id}>
                            {product?.title}
                        </div>
                    )
                }) : "No Data Found"
            }
        </div>
    )
}

export default ProductList
