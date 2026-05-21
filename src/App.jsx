import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuItemsDisplay from "./components/MenuItemsDisplay";
import CreateItemComponent from "./components/CreateItemComponent";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuItemsDisplay />} />
          <Route path="/createItem" element={<CreateItemComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
