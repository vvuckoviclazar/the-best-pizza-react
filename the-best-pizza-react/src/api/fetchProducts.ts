export async function fetchProducts() {
  const res = await fetch("https://react-fast-pizza-api.onrender.com/api/menu");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.data;
}
