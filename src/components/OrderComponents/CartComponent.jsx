import { useState } from "react";
import ItemQuantityComponent from "./ItemQuantityComponent";

function CartComponent({ menuItem, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const decrementQty = () => {
    setQuantity((currentQty) => Math.max(1, currentQty - 1));
  };

  const incrementQty = () => {
    //currentQty holds the latest state(quantity) value
    setQuantity((currentQty) => currentQty + 1);
  };
  return (
    <div className="d-flex align-items-center gap-2">
      <ItemQuantityComponent
        quantity={quantity}
        incrementQty={incrementQty}
        decrementQty={decrementQty}
      />
      <button
        className="btn btn-primary rounded-pill px-4"
        onClick={() => addToCart(menuItem, quantity)}
      >
        AddToCart
      </button>
    </div>
  );
}

export default CartComponent;
