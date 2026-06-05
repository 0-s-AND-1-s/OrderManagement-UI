import { useEffect, useState } from "react";
import { getAllItems } from "../../services/MenuManagementService";
import AddCartComponent from "./AddCartComponent";
import CartItemsListComponent from "./CartItemsListComponent";

function OrderItemsComponent() {
  const [menuItems, setMenuItems] = useState([]);
  const [itemsInCart, setCartItems] = useState([]);
  useEffect(() => {
    getAllItems().then((response) => setMenuItems(response.data));
  }, []);
  // This runs only when itemsInCart actually changes
  useEffect(() => {
    console.log("Current Cart Contents:", itemsInCart);
  }, [itemsInCart]);

  let availableMenuItems = menuItems.filter(
    (item) => item.itemAvailability === true,
  );

  const addToCart = (nextMenuItem, qty) => {
    setCartItems((prevCartItems) => {
      //checking if there's an duplicated element
      const isAvailable = prevCartItems.some(
        (cartItem) => cartItem.itemId === nextMenuItem.itemId,
      );

      if (isAvailable) {
        return prevCartItems.map((cartItem) =>
          cartItem.itemId === nextMenuItem.itemId
            ? { ...cartItem, quantity: cartItem.quantity + qty }
            : cartItem,
        );
      }

      //if no duplicate cart item exists
      return [...prevCartItems, { ...nextMenuItem, quantity: qty }];
    });
  };

  return (
    <>
      <div className="container">
        <h1>Menu Items Card</h1>
        <div className="container mt-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Item Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableMenuItems.map((item) => {
                return (
                  <tr key={item.itemId}>
                    <td>{item.itemName}</td>
                    <td>{item.itemPrice}</td>
                    <td>{item.itemCategory}</td>
                    <td>
                      <AddCartComponent menuItem={item} addToCart={addToCart} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <CartItemsListComponent cartItemsList={itemsInCart} />
      </div>
    </>
  );
}

export default OrderItemsComponent;
