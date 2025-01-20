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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.array(z.string()),
  category: z.object({
    label: z.string(),
    value: z.string(),
  }),
  price: z.number().min(0, "Price must be positive"),
  imageUrl: z.string().url("Must be a valid URL"),
});

function ProductForm() {
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const { categories, isLoading } = useCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      features: [],
      price: 0,
      imageUrl: "",
    },
  });

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput]);
      form.setValue("features", [...features, featureInput]);
      setFeatureInput("");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
          <ol className="list-decimal pl-6">
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
          <h2 className="text-xl font-semibold mb-4">Image</h2>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            type="submit"
            className="min-w-[120px] bg-red-600 hover:bg-red-700 transition-all hover:scale-105"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
