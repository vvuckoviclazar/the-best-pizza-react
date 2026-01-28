type CreateOrderInput = {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: any[];
};

export async function createOrder(order: CreateOrderInput) {
  const res = await fetch(
    "https://react-fast-pizza-api.onrender.com/api/order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.data;
}
