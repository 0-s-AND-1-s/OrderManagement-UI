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
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Create MenuItem</h3>
            <div className="card-body">
              <form onSubmit={postMenuItem}>
                <div className="form-group">
                  <label htmlFor="itmName">Item Name:: </label>
                  <input
                    type="text"
                    id="itmName"
                    name="itemName"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itmPrice">Item Price:: </label>
                  <input
                    type="number"
                    step={0.01}
                    min={0}
                    id="itmPrice"
                    name="itemPrice"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itmCty">Item Category:: </label>
                  <input
                    type="text"
                    id="itmCty"
                    name="itemCategory"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itemAvailable">Item Availability::</label>
                  <select
                    name="itemAvailability"
                    id="itemAvailable"
                    className="form-select"
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Send Data"
                    className="btn btn-primary mt-3 w-100"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateItemComponent;
