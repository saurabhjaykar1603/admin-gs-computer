import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteProduct } from "./useDeleteProduct";
import { useNavigate } from "react-router-dom";

interface DeleteProductProps {
    id: string;
    onClose: () => void; // Callback to close the dialog
}

function DeleteProduct({ id, onClose }: DeleteProductProps) {
    const { mutate: deleteProduct } = useDeleteProduct();
const navigate =useNavigate()

    return (
        <AlertDialog open={true} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        Category and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-400 hover:bg-red-600"
                        onClick={() => deleteProduct(id,{
                            onSuccess:()=>{
                                navigate('/dashboard/products')

                            }
                        })}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteProduct;
