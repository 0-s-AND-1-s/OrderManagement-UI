import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuItemsDisplay from "./components/MenuItemsDisplay";
import CreateItemComponent from "./components/CreateItemComponent";
import UpdateMenuItemComponent from "./components/UpdateMenuItemComponent";
import PartialUpdateComponent from "./components/PartialUpdateComponent";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuItemsDisplay />} />
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
