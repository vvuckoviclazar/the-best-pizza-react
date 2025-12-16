import type { RootState } from "../store";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Btn from "../components/btn.tsx";
import { GoArrowLeft } from "react-icons/go";
import OrderLi from "../parts/orderLi";

export default function CartPage() {
  const name = useSelector((state: RootState) => state.user.name);
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="cart-page-div">
      <Link to="/orders">
        <Btn className="back-to-menu">
          <GoArrowLeft size={17} />
          Back to menu
        </Btn>
      </Link>

      <div className="your-cart-div">
        <h2 className="cart-h2">Your cart,</h2>
        <h2 className="cart-h2">{name}</h2>
      </div>
      <ul className="cart-items-ul">
        {cart.map((item) => (
          <OrderLi
            key={item.pizza.id}
            id={item.pizza.id}
            name={item.pizza.name}
            unitPrice={item.pizza.unitPrice}
            quantity={item.quantity}
          />
        ))}
      </ul>
      <div className="order-clear-div">
        <Btn className="order-pizzas-btn">ORDER PIZZAS</Btn>
        <Btn className="clear-cart-btn">CLEAR CART</Btn>
      </div>
    </div>
  );
}
