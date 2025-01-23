import { buildUrl } from "@/utils/utils";
import { api } from "../api/axios";

interface CreateProductPayload {
  title: string;
  description: string;
  price: number;
  category: string;
  features: [string];
  images: [string];
}

export const createProductApi = async (
  data: CreateProductPayload,
  imageFile: File | Array<File>
) => {
  const response = await api.post("/api/v1/products/create", data);

  if (response.data.data.statusCode !== 200) {
    throw new Error("Failed to create product");
  }
  if (!Array.isArray(imageFile)) {
    if (!imageFile) return response.data.data;
    imageFile = [imageFile];
  }
  await uploadImage(response.data.data._id, imageFile);
};
export const updateProductApi = async (
  id: string,
  data: Partial<CreateProductPayload>,
  imageFile?: File | Array<File>
) => {
  const response = await api.patch(`/api/v1/products/update/${id}`, data);

  if (response.data.data.statusCode !== 200) {
    throw new Error("Failed to update product");
  }

  if (imageFile) {
    if (!Array.isArray(imageFile)) {
      imageFile = [imageFile];
    }
    await uploadImage(id, imageFile);
  }

  return response.data.data;
};

async function uploadImage(id: string, imageFile: File | Array<File>) {
  const formData = new FormData();
  const files = Array.isArray(imageFile) ? imageFile : [imageFile];
  files.forEach((file) => {
    formData.append("image", file);
  });
  const response = await api.patch(
    `/api/v1/products/update-image/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (response.data.data.statusCode !== 200) {
    throw new Error("Failed to upload image");
  }
  return response.data.data;
}
export const getAllProductsApi = async (
  filter: Record<string, unknown>,
  signal?: AbortSignal
) => {
  const response = await api.get(
    buildUrl("/api/v1/products/vender-products", filter, false),
    { signal }
  );
  return response.data.data;
};

export const getProductByIdApi = async (id: string) => {
  const response = await api.get(`/api/v1/products/vender-products?id=${id}`);

  return response.data.data;
};

export const deleteProductApi = async (id: string) => {
  const response = await api.delete(`/api/v1/products/delete/${id}`);
  return response.data.data;
};
export const deleteProductImageApi = async (id: string, url: string) => {
  const response = await api.delete(`/api/v1/products/delete-image/${id}`, {
    data: { url },
  });
  return response.data.data;
};
