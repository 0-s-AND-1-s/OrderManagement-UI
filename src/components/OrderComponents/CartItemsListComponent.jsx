import { useCart } from "../../context/CartContext";
import ItemQuantityComponent from "./ItemQuantityComponent";

function CartItemsListComponent() {
  const { itemsInCart, changeQuantity, removeFromCart } = useCart();
  const totalPrice = itemsInCart.reduce((total, item) => {
    return total + item.quantity * item.itemPrice;
  }, 0);

  if (itemsInCart.length === 0) {
    return (
      <div className="mt-4">
        <h3>Items in Cart:</h3>
        <p>No items added to cart yet.</p>
      </div>
    );
  }
  return (
    <div className="mt-4">
      <h3>Items in Cart:</h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {itemsInCart.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemName}</td>
              <td>
                <ItemQuantityComponent
                  quantity={item.quantity}
                  updateQuantity={(change) =>
                    changeQuantity(item.itemId, change)
                  }
                />
              </td>
              <td>${(item.quantity * item.itemPrice).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.itemId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <h5>Total: ${totalPrice.toFixed(2)}</h5>

        <button className="btn btn-success">Submit Order</button>
      </div>
    </div>
  );
}

export default CartItemsListComponent;
