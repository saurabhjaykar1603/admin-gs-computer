import React from 'react';
import { useProduct } from './useProduct';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductDetails = () => {
  const { data, isLoading, isError, error } = useProduct();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">Error: {error?.message || 'Something went wrong'}</p>
      </div>
    );
  }

  const productData = data?.products[0]; // Assuming you are fetching one product at a time

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No product found.</p>
      </div>
    );
  }

  // Prepare images for the gallery
  const images = productData.images?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="sm:px-6 lg:px-8 p-5">
      <p className="text-xl font-normal text-gray-600 md:mt-10 md:text-3xl">{productData?.title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div className="space-y-6 mt-4 md:mt-10">
          <p className="text-gray-600 leading-8 text-sm md:text-[16px]">{productData?.description}</p>
          <p className="text-red-500 font-bold text-2xl">₹{productData?.price}</p>
          <div>
            <p className={`text-sm ${productData.availability ? 'text-green-600' : 'text-red-500'}`}>
              {productData?.availability ? 'Available' : 'Out of Stock'}
            </p>
          </div>
          <div>
            <h1 className='text-xl font-normal text-gray-700'>Features :</h1>
            <ul className="list-inside text-gray-400 space-y-1 mt-2 text-sm md:text-[16px] leading-8">
              {productData?.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

        </div>

        <div className="max-w-xl border p-4 rounded-md md:mt-10">
          <Gallery
            items={images}
            showThumbnails={true}
            showPlayButton={false}
            showFullscreenButton={true}
            useBrowserFullscreen={false}
            showNav={false}
            thumbnailPosition="right"
          />
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
