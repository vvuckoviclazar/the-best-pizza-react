import "./index.css";
import Input from "./components/input";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import Btn from "./components/btn.tsx";
import { GoArrowRight } from "react-icons/go";
import { useState } from "react";

function App() {
  const name = useSelector((state: RootState) => state.user.name);
  const cart = useSelector((state: RootState) => state.cart.items);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // pogledaj u redux useSelector
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.pizza.unitPrice * item.quantity,
    0
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/order/${search}`);
  }

  return (
    <>
      <header className="fast-pizza-header">
        <Link to="/">
          <h1 className="fast-pizza-h1">FAST REACT PIZZA CO.</h1>
        </Link>
        <form onSubmit={handleSearch}>
          <Input
            className="search-order-input"
            type="text"
            placeholder="Search order #"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
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
