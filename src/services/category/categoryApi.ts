import { api } from "../api/axios";

interface categoryData {
  name: string;
}

export const createCategoryApi = async (data: categoryData) => {
  const response = await api.post("/api/v1/categories/create", data);
  return response.data.data;
};

export const getAllCategoriesApi = async () => {
  const response = await api.get("/api/v1/categories/get");
  return response.data.data;
};

export const updateCategoryApi = async (id: string, data: categoryData) => {
  const response = await api.patch(`/api/v1/categories/update/${id}`, data);
  return response.data.data;
};

export const deleteCategoryApi = async (id: string) => {
  const response = await api.delete(`/api/v1/categories/delete/${id}`);
  return response.data.data;
};
