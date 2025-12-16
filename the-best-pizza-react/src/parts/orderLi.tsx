import Btn from "../components/btn.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
} from "../features/cartSlice";

type OrderLiProps = {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
};

export default function OrderLi({
  id,
  name,
  unitPrice,
  quantity,
}: OrderLiProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className="order-li" key={id}>
      <span className="order-quantity-name">
        {quantity}× {name}
      </span>

      <div className="order-controls">
        <span className="order-price">€{unitPrice}.00</span>

        <Btn
          className="order-decrease"
          onClick={() => dispatch(decreaseItemQuantity(id))}
        >
          -
        </Btn>

        <span className="order-quantity">{quantity}</span>

        <Btn
          className="order-increase"
          onClick={() => dispatch(increaseItemQuantity(id))}
        >
          +
        </Btn>

        <Btn className="order-delete" onClick={() => dispatch(deleteItem(id))}>
          DELETE
        </Btn>
      </div>
    </li>
  );
}
