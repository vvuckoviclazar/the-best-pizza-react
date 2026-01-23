import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderedPizzasPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      const res = await fetch(
        `https://react-fast-pizza-api.onrender.com/api/order/${orderId}`
      );
      const data = await res.json();
      setOrder(data.data);
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  if (loading) return <h1 className="loading">|||</h1>;

  const pizzasPrice = order.cart.reduce(
    (sum: number, item: any) => sum + item.totalPrice,
    0
  );

  const priorityPrice = order.priority ? 5 : 0;
  const totalPrice = pizzasPrice + priorityPrice;

  return (
    <div className="orderId-container">
      <div className="id-div">
        <h2 className="orderId-h2">Order #{order.id} status</h2>
        <div className="priority-div">
          {order.priority && (
            <p className="priority preparing-info">PRIORITY</p>
          )}
          <p className="preparing preparing-info">PREPARING ORDER</p>
        </div>
      </div>
      <h2 className="only-h2">Only 42 minutes left 😃</h2>

      <ul className="orderId-ul">
        {order.cart.map((item: any) => (
          <li className="ordered-li" key={item.pizzaId}>
            <div className="nameQ-div">
              <p className="ordered-p">{item.quantity}×</p>
              <p className="ordered-name">{item.name}</p>
            </div>
            <p className="ordered-p">€{item.totalPrice}.00</p>
          </li>
        ))}
      </ul>
      <div className="delivery-div">
        <p className="price-pizza-p">Price pizza: €{pizzasPrice}.00</p>
        {order.priority && <p className="price-pizza-p">Price priority: 5€</p>}
        <h3 className="delivery-h3">To pay on delivery: {totalPrice}€</h3>
      </div>
    </div>
  );
}
