import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getItemById,
  partialUpdate,
} from "../../services/MenuManagementService";

function PartialUpdateComponent() {
  const { itemId } = useParams();
  const [menuObj, setMenuObj] = useState({});
  const navigate = useNavigate();
  let partialObj = useRef({});

  useEffect(() => {
    // Get Menu Id here and
    console.log("Partial Update Component useEffect() got called");
    getItemById(itemId).then((response) => {
      console.log("response.data", response.data);
      const stateMenuObj = response.data;
      partialObj.current = stateMenuObj;
      setMenuObj(stateMenuObj);
    });
  }, [itemId]);

  function getPartialUpdateItemObj() {
    const patchPayloadObj = partialObj.current;
    const patchReqObject = {};
    if (patchPayloadObj !== menuObj) {
      Object.keys(menuObj).forEach((propertyName) => {
        //Checking if the data has been changed
        if (menuObj[propertyName] !== patchPayloadObj[propertyName]) {
          patchReqObject[propertyName] = menuObj[propertyName];
        }
      });
    }
    return patchReqObject;
  }

  const updateItem = async (event) => {
    event.preventDefault();
    const partialMenuObj = getPartialUpdateItemObj();
    if (Object.keys(partialMenuObj).length > 0) {
      const response = await partialUpdate(partialMenuObj, itemId);
      console.log("Item Updation status", response.data);
      navigate("/");
    } else navigate("/");
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

  const itemAvailabilityHandler = (event) => {
    setMenuObj({ ...menuObj, itemAvailability: event.target.value === "true" });
  };

  return (
    <>
      <h1>Hey Abhi !!You're here to Update a MenuItem Tadaa 😒</h1>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Partial Update MenuItem</h3>
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
                  <label>
                    <input
                      type="radio"
                      name="availabilityGroup"
                      value="true"
                      checked={menuObj.itemAvailability === true}
                      onChange={itemAvailabilityHandler}
                    />
                    Available
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="availabilityGroup"
                      value="false"
                      checked={menuObj.itemAvailability === false}
                      onChange={itemAvailabilityHandler}
                    />
                    Not Available
                  </label>
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
