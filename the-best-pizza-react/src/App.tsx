import "./index.css";
import Input from "./components/input";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import Btn from "./components/btn.tsx";
import { GoArrowRight } from "react-icons/go";
import { useState } from "react";
import {
  selectCartItems,
  selectTotalItems,
  selectCartPrice,
} from "./features/cartSlice";

function App() {
  const name = useSelector((state: RootState) => state.user.name);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const cart = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectCartPrice);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/${search}`);
    setSearch("");
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
