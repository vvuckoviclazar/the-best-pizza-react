import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (!order) return <h1>|||</h1>;

  return (
    <div className="orderId-container">
      <div className="id-div">
        <h2 className="orderId-h2">Order #{order.id} status</h2>
        <div className="priority-div">
          <p className="priority preparing-info">PRIORITY</p>
          <p className="preparing preparing-info">PREPARING ORDER</p>
        </div>
      </div>
      <h2 className="only-h2">Only 42 minutes left 😃</h2>

      <ul className="orderId-ul">
        {order.cart.map((item: any) => (
          <li key={item.pizzaId}>
            {item.quantity}× {item.name} — €{item.totalPrice}.00
          </li>
        ))}
      </ul>
    </div>
  );
}
