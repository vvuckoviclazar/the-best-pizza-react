import { useEffect, useState } from "react";
import ItemLi from "../parts/itemLi.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  type Pizza,
} from "../features/cartSlice";

export default function OrderPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cart.items);

  function handleAddToCart(pizza: Pizza) {
    dispatch(addItem(pizza));
  }

  function handleIncrease(pizzaId: number) {
    dispatch(increaseItemQuantity(pizzaId));
  }

  function handleDecrease(pizzaId: number) {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  function handleDelete(pizzaId: number) {
    dispatch(deleteItem(pizzaId));
  }

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const res = await fetch(
          "https://react-fast-pizza-api.onrender.com/api/menu"
        );
        const response = await res.json();
        setPizzas(response.data);
      } finally {
        setLoading(false);
      }
    }

    fetchPizzas();
  }, []);

  if (loading) return <h1 className="loading">|||</h1>;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.pizza.unitPrice * item.quantity,
    0
  );

  return (
    <>
      <section className="pizza-orders-section">
        <ul className="pizzas-ul">
          {pizzas.map((pizza) => {
            const cartItem = cart.find((item) => item.pizza.id === pizza.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <ItemLi
                key={pizza.id}
                id={pizza.id}
                name={pizza.name}
                imageUrl={pizza.imageUrl}
                ingredients={pizza.ingredients}
                unitPrice={pizza.unitPrice}
                soldOut={pizza.soldOut}
                quantity={quantity}
                onAddToCart={() => handleAddToCart(pizza)}
                onIncrease={() => handleIncrease(pizza.id)}
                onDecrease={() => handleDecrease(pizza.id)}
                onDelete={() => handleDelete(pizza.id)}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}
