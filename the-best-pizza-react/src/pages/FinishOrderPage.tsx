import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import Input from "../components/input";
import Label from "../components/label";
import Btn from "../components/btn";
import { clearCart } from "../features/cartSlice";

export default function FinishOrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );

      const data = await res.json();

      setAddress(data.address.road);
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cartForApi = cart.map((item) => ({
      pizzaId: item.pizza.id,
      name: item.pizza.name,
      quantity: item.quantity,
      unitPrice: item.pizza.unitPrice,
      totalPrice: item.pizza.unitPrice * item.quantity,
    }));

    const newOrder = {
      customer,
      phone,
      address,
      priority,
      cart: cartForApi,
    };

    await fetch("https://react-fast-pizza-api.onrender.com/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    dispatch(clearCart());

    setCustomer("");
    setPhone("");
    setAddress("");
    setPriority(false);
  }

  return (
    <form className="finish-order-page" onSubmit={handleSubmit}>
      <h1 className="ready-h1">Ready to order? Let's go!</h1>

      <div className="input-div">
        <Label
          text="First Name"
          className="ready-label"
          htmlFor="first-name-input"
        />
        <Input
          className="first-name-input ready-input"
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>

      <div className="input-div">
        <Label
          text="Phone number"
          className="ready-label"
          htmlFor="phone-number-input"
        />
        <Input
          className="phone-number-input ready-input"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="input-div relative-div">
        <Label text="Address" className="ready-label" htmlFor="address-input" />
        <Input
          className="address-input ready-input"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Btn className="get-btn" type="button" onClick={getLocation}>
          GET POSITION
        </Btn>
      </div>

      <div className="check-input-div">
        <Input
          className="check-input"
          type="checkbox"
          checked={priority}
          onChange={(e) => setPriority(e.target.checked)}
        />
        <p className="ready-p">Want to give your order priority?</p>
      </div>

      <Btn className="order-now-btn" type="submit">
        ORDER NOW
      </Btn>
    </form>
  );
}
