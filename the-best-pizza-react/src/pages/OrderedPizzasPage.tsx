import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Btn from "../components/btn";
import { getSingleOrder } from "../api/getSingleOrder";

export default function OrderedPizzasPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);

      try {
        const order = await getSingleOrder(orderId!);
        setOrder(order);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) return <h1 className="loading">|||</h1>;

  if (error) {
    return (
      <div className="order-error">
        <p className="error-p">Something went wrong 😢</p>
        <p className="error-p">Couldn't find order #{orderId}</p>
        <Btn className="go-back-btn" onClick={() => navigate(-1)}>
          ← Go back
        </Btn>
      </div>
    );
  }

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
