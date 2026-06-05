import { useEffect, useState } from "react";
import { getAllItems } from "../../services/MenuManagementService";
import AddCartComponent from "./AddCartComponent";
import CartItemsListComponent from "./CartItemsListComponent";

function OrderItemsComponent() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    getAllItems().then((response) => setMenuItems(response.data));
  }, []);

  let availableMenuItems = menuItems.filter(
    (item) => item.itemAvailability === true,
  );

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
                      <AddCartComponent menuItem={item} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <CartItemsListComponent />
      </div>
    </>
  );
}

export default OrderItemsComponent;
