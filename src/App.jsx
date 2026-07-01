import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MenuItemsDisplay from "./components/MenuItemsDisplay";
import OrderItemsComponent from "./components/OrderComponents/OrderItemsComponent";
import CreateItemComponent from "./components/MenuComponents/CreateItemComponent";
import UpdateMenuItemComponent from "./components/MenuComponents/UpdateMenuItemComponent";
import PartialUpdateComponent from "./components/MenuComponents/PartialUpdateComponent";
import CartItemsContext from "./context/CartItemsContext";
import DisplayReceiptComponent from "./components/ReceiptComponents/DisplayReceiptComponent";
import HomePage from "./components/HomePage/HomePageComponent";
function App() {
  return (
    <>
      <BrowserRouter>
        <CartItemsContext>
          <Routes>
            //Going to change this eventually based on user access
            <Route path="/" element={<HomePage />} />
            <Route path="/orderItems" element={<OrderItemsComponent />} />
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
            <Route
              path="/displayReceipt/:receiptId"
              element={<DisplayReceiptComponent />}
            />
          </Routes>
        </CartItemsContext>
      </BrowserRouter>
    </>
  );
}

export default App;
