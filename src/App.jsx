import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuItemsDisplay from "./components/MenuItemsDisplay";
import CreateItemComponent from "./components/CreateItemComponent";
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
            element={<PartialUpdateComponent />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
