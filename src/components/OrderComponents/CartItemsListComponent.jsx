import { useCart } from "../../context/CartContext";
import ItemQuantityComponent from "./ItemQuantityComponent";
import { createOrder } from "../../services/OrderManagementService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CartItemsListComponent() {
  const [isOrderPlaced, setOrderPlaced] = useState(false);
  const { itemsInCart, changeQuantity, removeFromCart, resetCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = itemsInCart.reduce((total, item) => {
    return total + item.quantity * item.itemPrice;
  }, 0);

  const placeOrder = async (orderItemsList) => {
    const orderItemsRequest = orderItemsList.map((orderItem) => ({
      itemId: orderItem.itemId,
      quantity: orderItem.quantity,
    }));

    try {
      //Sending a request to backend api
      const response = await createOrder(orderItemsRequest);
      let printReceipt = false;
      const { orderId, receiptId, msg } = response.data;
      console.log(
        "Checking your OrderSuccessResponse object Data" +
          "\nOrderId::" +
          orderId +
          "\nReceiptId::" +
          receiptId +
          "\nmsg::" +
          msg,
      );
      if (response.status === 201 || response.status === 200) {
        setOrderPlaced(true);
        setTimeout(() => {
          setOrderPlaced(false);
          resetCart();
          printReceipt = window.confirm("Do you need Receipt😉?");
          printReceipt
            ? navigate(`/displayReceipt/${receiptId}`)
            : navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log("Failed to place order:", error);
    }
  };

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
        {isOrderPlaced ? (
          <h5 className="text-success fw-bold">
            Order Has Been Placed Successfully😁
          </h5>
        ) : (
          <></>
        )}
        <button
          className="btn btn-success"
          onClick={() => placeOrder(itemsInCart)}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default CartItemsListComponent;
