import DeleteCategoryButton from "./DeleteCategoryButton";
import EditCategoryButton from "./EditCategoryButton";

function CategoryCard({ name, id }: { name: string; id: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="font-medium">{name}</div>
      <div className="flex items-center gap-2">
        <EditCategoryButton defaultData={name} id={id} />
        <DeleteCategoryButton id={id} />
      </div>
    </div>
  );
}

export default CategoryCard;
