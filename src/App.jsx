import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuItemsDisplay from "./components/MenuItemsDisplay";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuItemsDisplay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
