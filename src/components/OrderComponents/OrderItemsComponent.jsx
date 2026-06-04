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

  const availableItemsInCart = (nextItem) =>
    setCartItems((prevCartItems) => {
      console.log("Previous Cart Items List", prevCartItems);
      return [...prevCartItems, nextItem];
    });

  function addToCart(nextMenuItem, qty) {
    // TODO: Prevent Duplicate Cart Items
    availableItemsInCart({ ...nextMenuItem, quantity: qty });
  }
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
