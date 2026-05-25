import { useEffect, useState } from "react";
import { getAllItems, deleteItem } from "../services/MenuManagementService";
import { useNavigate } from "react-router-dom";

function MenuItemsDisplay() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllItems().then((response) => setMenuItems(response.data));
  }, []);

  async function deleteMenuItem(itemId) {
    const response = await deleteItem(itemId);
    console.log("Deleted Status", response.data);
    setMenuItems(menuItems.filter((item) => item.itemId !== itemId));
  }

  function updateMenuItem(id) {
    navigate(`/updateItem/${id}`);
  }

  function partialUpdateItem(id) {
    navigate(`/partialUpdateItem/${id}`);
  }

  function addMenuItem() {
    navigate("/createItem");
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
                <th>Item Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* <th>Item Availability</th> */}
              {menuItems.map((item) => {
                return (
                  <tr key={item.itemId}>
                    <td>{item.itemName}</td>
                    <td>{item.itemPrice}</td>
                    <td>{item.itemCategory}</td>
                    <td>
                      {item.itemAvailability ? "Available" : "Not Available"}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateMenuItem(item.itemId)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => partialUpdateItem(item.itemId)}
                      >
                        Partial Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteMenuItem(item.itemId)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button onClick={() => addMenuItem()} className="btn btn-primary">
          Add
        </button>
      </div>
    </>
  );
}

export default MenuItemsDisplay;
