// Import the default page size constant
import { PAGE_SIZE } from "./constant";

// This function builds a URL string with query parameters for API requests
export function buildUrl(
  // The API resource/endpoint to target (e.g. "products", "categories")
  resource: unknown,
  // Object containing filter parameters as key-value pairs
  filters?: { [s: string]: unknown } | ArrayLike<unknown>,
  // Whether to fetch all results or paginate
  fetchAll?: boolean
) {
  // Start building the URL with the resource and size parameter
  // If fetchAll is true, get 1000 items, otherwise use PAGE_SIZE (12)
  let url = `${resource}?size=${fetchAll ? 1000 : PAGE_SIZE}`;

  // Loop through the filters object and add each filter as a query parameter
  for (const [key, val] of Object.entries(filters || {})) {
    // Only add the parameter if it has a value
    if (val) {
      url += `&${key}=${val}`;
    }
  }

  // Return the complete URL string with all parameters
  return url;
}
