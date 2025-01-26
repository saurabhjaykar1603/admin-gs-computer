export interface CreateProductPayload {
  title: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  images: string[];
}

export interface UpdateProductPayload extends CreateProductPayload {
  id: string;
  imageFile?: File | Array<File>;
}

export type DefaultFormValues = {
  title: string;
  description: string;
  features: string[];
  category: {
    label: string;
    value: string;
  };
  price: number;
  images: string[];
};
