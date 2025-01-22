import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import FormInputDataList from "@/components/ui/FormInputDataList";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useCategories } from "../Categories/useCategories";
import { Category } from "@/types/Category";
import { TrashIcon } from "lucide-react";
import { useCreateProduct } from "./useCreateProduct";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.array(z.string()),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  price: z.number().min(0, "Price must be positive"),
  images: z.array(z.string().url("Must be a valid URL")),
});

function ProductForm() {
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { categories, isLoading } = useCategories();
  const { mutate: createProduct,isPending: isCreateProductPending } = useCreateProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      features: [],
      price: 0,
      images: [],
    },
  });

  const addFeature = () => {
    if (featureInput.trim()) {
      const newFeature = `${features.length + 1}. ${featureInput}`;
      const updatedFeatures = [...features, newFeature];
      setFeatures(updatedFeatures);
      form.setValue("features", updatedFeatures);
      setFeatureInput("");
    }
  };

  const addImage = () => {
    if (imageInput.trim()) {
      const newImages = [...images, imageInput];
      setImages(newImages);
      form.setValue("images", newImages);
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    form.setValue("images", newImages);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createProduct({
      imageFile:[] as Array<File>,
      data:{
        ...values,
        category:values.category.value
      }
    })
  };

  const categoryOptions = categories?.map((category: Category) => ({
    label: category?.name,
    value: category?._id,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow border border-red-400">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-red-400">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="flex gap-2 mb-4">
            <Input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Add a feature"
            />
            <Button type="button" onClick={addFeature}>
              Add
            </Button>
          </div>
          <ol className="list-non pl-6">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-red-400">
          <h2 className="text-xl font-semibold mb-4">Category & Pricing</h2>
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <FormInputDataList
                control={form.control as unknown as Control}
                registerName="category"
                data={categoryOptions}
                placeholder="Select category"
                required
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-red-400">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          <div className="flex gap-2 mb-4">
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="Add image URL"
            />
            <Button type="button" onClick={addImage}>
              Add
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group  flex justify-center items-center"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg transition-all group-hover:opacity-75"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <TrashIcon width={16} height={16} stroke="currentColor" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-6">
          <Button
            type="button"
            variant="outline"
            className="min-w-[120px] transition-all hover:scale-105"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            disabled={isCreateProductPending}
            type="submit"
            className="min-w-[120px] bg-red-600 hover:bg-red-700 transition-all hover:scale-105"
          >
           {
            isCreateProductPending ? "Submitting..." : "Submit"
           }
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
