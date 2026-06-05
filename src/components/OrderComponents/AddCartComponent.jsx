import { useState } from "react";
import ItemQuantityComponent from "./ItemQuantityComponent";
import { useCart } from "../../context/CartContext";
function AddCartComponent({ menuItem }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const updateMenuRowQty = (change) => {
    //currentQty holds the latest state(quantity) value
    setQuantity((currentQty) => Math.max(1, currentQty + change));
  };
  return (
    <div className="d-flex align-items-center gap-2">
      <ItemQuantityComponent
        quantity={quantity}
        updateQuantity={updateMenuRowQty}
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

export default AddCartComponent;
