export async function getSingleOrder(orderId: string) {
  const res = await fetch(
    `https://react-fast-pizza-api.onrender.com/api/order/${orderId}`
  );

  if (!res.ok) {
    throw new Error("Order not found");
  }

  const data = await res.json();
  return data.data;
}
