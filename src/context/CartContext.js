import { createContext, useContext } from "react";

// This is a plain configuration object/constant, NOT a component.
export const CartContext = createContext(null);

//Custom hook for consuming components to inject the state
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
