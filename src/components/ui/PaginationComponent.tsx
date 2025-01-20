import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/utils/constant";
import { useSearchParams } from "react-router-dom";


function PaginationComponent({
  totalSize,
  isLoading,
  PerPageOptions,
}: {
  totalSize: number;
  isLoading: boolean;
  PerPageOptions?: number[];
}) {
  const totalPages = Math.ceil(totalSize / PAGE_SIZE);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const currentPageSize = !searchParams.get("size")
    ? PAGE_SIZE
    : Number(searchParams.get("size"));

  function handlePrevious() {
    if (currentPage > 1) {
      searchParams.set("page", String(currentPage - 1));
      setSearchParams(searchParams);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      searchParams.set("page", String(currentPage + 1));
      setSearchParams(searchParams);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePageSelect(e: { target: { value: unknown } }) {
    searchParams.set("page", String(Number(e.target.value)));
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSizeSelect(e: { target: { value: unknown } }) {
    const newSize = Number(e.target.value);
    searchParams.set("size", String(newSize));
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!totalSize) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 mt-5">
      <span className="text-sm text-muted-foreground order-1 md:order-none">
        Total Items: {totalSize.toLocaleString()}
      </span>

      <Pagination className="order-3 md:order-none">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              aria-disabled={isLoading || currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i} className="hidden md:inline-block">
              <PaginationLink
                onClick={() => {
                  searchParams.set("page", String(i + 1));
                  setSearchParams(searchParams);
                }}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              aria-disabled={isLoading || currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-2 order-2 md:order-none">
        <span className="text-sm text-muted-foreground">Navigate to Page:</span>
        <select
          value={currentPage}
          onChange={handlePageSelect}
          className="h-8 w-16 rounded-md border border-input bg-background"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {PerPageOptions && (
        <div className="flex items-center gap-2 order-4 md:order-none">
          <span className="text-sm text-muted-foreground">Items per page:</span>
          <select
            value={currentPageSize}
            onChange={handleSizeSelect}
            className="h-8 w-16 rounded-md border border-input bg-background"
          >
            {PerPageOptions.map((size: number) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default PaginationComponent;
