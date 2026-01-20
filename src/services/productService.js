const DB = "https://configurapro-default-rtdb.firebaseio.com";

// list all products
export async function fetchProducts() {
  const res = await fetch(`${DB}/products.json`);
  const data = await res.json();
  if (!data) return [];
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
 
}

// fetch a single product by id
export async function fetchProductById(id) {
  const res = await fetch(`${DB}/products/${id}.json`);
  const data = await res.json();
  return data ? { id, ...data } : null;
}
