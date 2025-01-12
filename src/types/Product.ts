export interface CreateProductPayload {
  title: string;
  description: string;
  price: number;
  category: string;
  features: [string];
  images: [string];
}

export interface UpdateProductPayload extends CreateProductPayload {
  id: string;
  imageFile?: File | Array<File>;
}
