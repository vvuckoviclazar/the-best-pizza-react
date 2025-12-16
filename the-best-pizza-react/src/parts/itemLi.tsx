import Btn from "../components/btn.tsx";

type itemLiProps = {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: string[];
  unitPrice: number;
  soldOut: boolean;
  quantity: number;
  onAddToCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
};

function ItemLi({
  id,
  name,
  imageUrl,
  ingredients,
  unitPrice,
  soldOut,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
  onDelete,
}: itemLiProps) {
  const isAdded = quantity > 0;

  return (
    <li key={id} className="pizza-li">
      <div className="img-info-div">
        <img className={!soldOut ? "pizza-img" : "gray-img"} src={imageUrl} />
        <div className="info-div">
          <h3 className="pizza-h3">{name}</h3>
          <p className="ingredients-p">Ingredients: {ingredients.join(", ")}</p>

          {soldOut && <p className="soldOut-p">SOLD OUT</p>}

          {!soldOut && !isAdded && <p className="price-p">€{unitPrice}.00</p>}

          {!soldOut && isAdded && (
            <div className="quantity-controls">
              <Btn className="decrease-btn" onClick={onDecrease}>
                -
              </Btn>
              <span className="quantity">{quantity}</span>
              <Btn className="increase-btn" onClick={onIncrease}>
                +
              </Btn>
              <Btn className="delete-btn" onClick={onDelete}>
                DELETE
              </Btn>
            </div>
          )}
        </div>
      </div>
      {isAdded && <p className="price-p margin-p">€{unitPrice}.00</p>}
      {!soldOut && !isAdded && (
        <Btn className="add-to-cart-btn" onClick={onAddToCart}>
          ADD TO CART
        </Btn>
      )}
    </li>
  );
}

export default ItemLi;
