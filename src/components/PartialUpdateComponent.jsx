import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, partialUpdate } from "../services/MenuManagementService";

function PartialUpdateComponent() {
  const { itemId } = useParams();
  const [menuObj, setMenuObj] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // Get Menu Id here and
    getItemById(itemId).then((response) => {
      console.log("MenuItem By ID", response.data);
      setMenuObj(response.data);
    });
  }, [itemId]);

  const updateItem = async (event) => {
    event.preventDefault();
    console.log(
      "Your Updated Obj before sending a request to backend",
      menuObj,
    );
    const response = await partialUpdate(menuObj, itemId);
    console.log("Item Updation status", response.data);
    navigate("/");
  };

  const itemNameHandler = (event) => {
    setMenuObj({ ...menuObj, itemName: event.target.value });
  };

  const itemPriceHandler = (event) => {
    setMenuObj({ ...menuObj, itemPrice: event.target.value });
  };

  const itemCategoryHandler = (event) => {
    setMenuObj({ ...menuObj, itemCategory: event.target.value });
  };

  //     const itemAvailabilityHandler = (event) => {
  //     setMenuObj(...menuObj, `itemAvailability:${event.target.value}`);
  //   };
  return (
    <>
      <h1>Hey Abhi !!You're here to Update a MenuItem Tadaa 😒</h1>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Update MenuItem</h3>
            <div className="card-body">
              <form onSubmit={updateItem}>
                <div className="form-group mb-3">
                  <label htmlFor="itmName">Item Name:: </label>
                  <input
                    type="text"
                    id="itmName"
                    name="itemName"
                    onChange={itemNameHandler}
                    value={menuObj.itemName ?? ""}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="itmPrice">Item Price:: </label>
                  <input
                    type="number"
                    step={0.01}
                    min={0}
                    id="itmPrice"
                    name="itemPrice"
                    onChange={itemPriceHandler}
                    value={menuObj.itemPrice ?? 0}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="itmCty">Item Category:: </label>
                  <input
                    type="text"
                    id="itmCty"
                    name="itemCategory"
                    onChange={itemCategoryHandler}
                    value={menuObj.itemCategory ?? ""}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
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
                <div className="form-group mb-3">
                  <input
                    type="submit"
                    value="Update"
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

export default PartialUpdateComponent;
