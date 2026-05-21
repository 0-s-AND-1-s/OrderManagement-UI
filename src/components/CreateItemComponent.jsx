import { createItem } from "../services/MenuManagementService";
import { useNavigate } from "react-router-dom";
function CreateItemComponent() {
  //  const [menuData, setMenuData] = useState({});
  const navigate = useNavigate();
  const postMenuItem = async (event) => {
    event.preventDefault();
    const itemData = new FormData(event.currentTarget);
    const menuitemObj = Object.fromEntries(itemData.entries());
    console.log(menuitemObj);

    // setMenuData(...menuitemObj);
    const response = await createItem({
      ...menuitemObj,
      itemPrice: parseFloat(menuitemObj.itemPrice),
      itemAvailability: menuitemObj.itemAvailability === "true",
    });
    console.log(response.data);
    navigate("/");
  };

  return (
    <>
      <h1>Hey Abhi !!You're here to create a MenuITem Tadaa 😒</h1>
      <div className="container">
        <form onSubmit={postMenuItem}>
          <label htmlFor="itmName">Item Name:: </label>
          <input type="text" id="itmName" name="itemName" />
          <br />
          <label htmlFor="itmPrice">Item Price:: </label>
          <input
            type="number"
            step={0.01}
            min={0}
            id="itmPrice"
            name="itemPrice"
          />
          <br />
          <label htmlFor="itmCty">Item Category:: </label>
          <input type="text" id="itmCty" name="itemCategory" />
          <br />
          <label htmlFor="itemAvailable">Item Availability::</label>
          <select name="itemAvailability" id="itemAvailable">
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          <br />
          <input type="submit" name="itemObject" value="Send Data" />
        </form>
      </div>
    </>
  );
}

export default CreateItemComponent;
