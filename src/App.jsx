import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MenuItemsDisplay from "./components/MenuItemsDisplay";
import OrderItemsComponent from "./components/OrderComponents/OrderItemsComponent";
import CreateItemComponent from "./components/CreateItemComponent";
import UpdateMenuItemComponent from "./components/UpdateMenuItemComponent";
import PartialUpdateComponent from "./components/PartialUpdateComponent";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          //Going to change this eventually based on user access
          <Route path="/" element={<OrderItemsComponent />} />
          {/* <Route path="/" element={<MenuItemsDisplay />} /> */}
          <Route path="/createItem" element={<CreateItemComponent />} />
          <Route
            path="/updateItem/:itemId"
            element={<UpdateMenuItemComponent />}
          />
          <Route
            path="/partialUpdateItem/:itemId"
            element={<PartialUpdateComponent />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
