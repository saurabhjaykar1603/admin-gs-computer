import { useState } from "react";
import { useProduct } from "./useProduct";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import DeleteProduct from "./DeleteProduct";
import { useCreateProduct } from "./useCreateProduct";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Product {
  category: string;
  _id: string;
  title: string;
  description: string;
  price: number;
  availability: boolean;
  images?: string[];
  features?: string[];
}

const ProductDetails: React.FC = () => {
  const { data, isLoading, isError, error } = useProduct();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const { mutate, isPending } = useCreateProduct();
  const navigate = useNavigate();

  const handleDuplicateProduct = (
    productData: Product,
    imageFile: File | File[]
  ): void => {
    mutate(
      {
        data: {
          title: `duplicate of ${productData.title}`,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          features: productData.features ?? [],
          images: productData.images ?? [],
        },
        imageFile: imageFile,
      },
      {
        onSuccess: () => {
          toast({
            title: "Product duplicated successfully",
            variant: "default",
          });
          navigate(-1);
        },
        onSettled: () => {
          toast({
            title: "Product duplicated successfully",
            variant: "default",
          });
          navigate(-1);
        },
      }
    );
  };

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  const openDeleteDialog = (): void => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = (): void => {
    setDeleteDialogOpen(false);
  };

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
        <p className="text-red-500 text-lg">
          Error: {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  const products = Array.isArray(data?.products) ? data.products : [];
  const productData: Product | undefined = products[0];

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No product found.</p>
      </div>
    );
  }

  const images = productData.images?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="sm:px-6 lg:px-8 p-7 relative border-2 border-red-400">
      {/* Three-dot menu */}
      <div className="absolute top-5 right-5">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zm0 5.25a.75.75 0 100-1.5.75.75 0 000 1.5zm0 5.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            />
          </svg>
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            onClick={closeMenu}
          >
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/dashboard/edit-products/${productData._id}`)}
              >
                Edit
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={openDeleteDialog}
              >
                Delete
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleDuplicateProduct(productData as Product, []);
                }}
              >
                {isPending ? "Duplicating..." : "Duplicate"}
              </li>
            </ul>
          </div>
        )}
      </div>

      <p className="text-xl font-medium text-gray-600 md:mt-10 md:text-2xl">
        {productData.title}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div className="space-y-6 mt-4 md:mt-10">
          <p className="text-gray-600 leading-8 text-sm md:text-[16px]">
            {productData.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-500 font-bold text-2xl">
                ₹{productData.price}
              </p>
            </div>
            <div>
              <p
                className={`text-normal ${
                  productData.availability ? "text-green-600" : "text-red-500"
                }`}
              >
                {productData.availability ? "Available" : "Out of Stock"}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-normal text-gray-700">Features :</h1>
            <ul className="list-inside text-gray-400 space-y-1 mt-2 text-sm md:text-[16px] leading-8">
              {productData.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-xl border-2 bg-white shadow-sm p-4 rounded-md md:mt-10">
          <Gallery
            items={images || []}
            showThumbnails={true}
            showPlayButton={false}
            showFullscreenButton={true}
            useBrowserFullscreen={false}
            showNav={false}
            thumbnailPosition="right"
          />
        </div>
      </div>

      {deleteDialogOpen && (
        <DeleteProduct id={productData._id} onClose={closeDeleteDialog} />
      )}
    </div>
  );
};

export default ProductDetails;
