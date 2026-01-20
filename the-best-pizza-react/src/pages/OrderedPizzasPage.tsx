import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderedPizzasPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(
        `https://react-fast-pizza-api.onrender.com/api/order/${orderId}`
      );
      const data = await res.json();
      setOrder(data.data);
    }
    fetchOrder();
  }, [orderId]);

  if (!order) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Order created ✅</h1>
      <h2>Order #{order.id}</h2>

      <h3>Your pizzas</h3>
      <ul>
        {order.cart.map((item: any) => (
          <li key={item.pizzaId}>
            {item.quantity}× {item.name} — €{item.totalPrice}.00
          </li>
        ))}
      </ul>

      <Link to="/orders">Back to menu</Link>
    </div>
  );
}
