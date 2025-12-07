import { useEffect, useState } from "react";
import ItemLi from "../parts/itemLi.tsx";

type Pizza = {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: string[];
  unitPrice: number;
  soldOut: boolean;
};

type CartItem = {
  pizza: Pizza;
  quantity: number;
};

export default function OrderPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  function handleAddToCart(pizza: Pizza) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.pizza.id === pizza.id);
      if (existing) {
        return prevCart.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { pizza, quantity: 1 }];
    });
  }

  function handleIncrease(pizzaId: number) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.pizza.id === pizzaId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecrease(pizzaId: number) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.pizza.id === pizzaId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleDelete(pizzaId: number) {
    setCart((prevCart) => prevCart.filter((item) => item.pizza.id !== pizzaId));
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

      {cart.length > 0 && (
        <div className="cart-info">
          <h2 className="items-number">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </h2>
          <h2 className="total-price">€{totalPrice}.00</h2>
        </div>
      )}
    </>
  );
}
