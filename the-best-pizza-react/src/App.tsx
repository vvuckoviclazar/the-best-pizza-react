import "./index.css";
import Input from "./components/input";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import Btn from "./components/btn.tsx";
import { GoArrowRight } from "react-icons/go";

function App() {
  const name = useSelector((state: RootState) => state.user.name);
  const cart = useSelector((state: RootState) => state.cart.items);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.pizza.unitPrice * item.quantity,
    0
  );

  return (
    <>
      <header className="fast-pizza-header">
        <Link to="/">
          <h1 className="fast-pizza-h1">FAST REACT PIZZA CO.</h1>
        </Link>
        <Input
          className="search-order-input"
          type="text"
          placeholder="Search order #"
        />
        {name && <h3 className="redux-value-h3">{name}</h3>}
      </header>

      {cart.length > 0 && (
        <div className="cart-info">
          <div className="cart-numbers">
            <h2 className="items-number">{totalItems}</h2>
            <h2 className="total-price">€{totalPrice}.00</h2>
          </div>
          <Link to="/cart">
            <Btn className="open-cart-btn">
              OPEN CART <GoArrowRight size={20} />
            </Btn>
          </Link>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default App;
