import "./index.css";
import Input from "./components/input";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function App() {
  const name = useSelector((state: RootState) => state.user.name);

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
      <Outlet />
    </>
  );
}

export default App;
