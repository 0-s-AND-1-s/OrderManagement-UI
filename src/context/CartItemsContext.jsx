import { useMemo, useCallback, useState } from "react";
import { CartContext } from "./CartContext";

function CartItemsContext({ children }) {
  //State hook for manging the cart Items data
  const [itemsInCart, setCartItems] = useState([]);

  //Adding Items to Cart Logic
  const addToCart = useCallback((nextMenuItem, qty) => {
    setCartItems((prevCartItems) => {
      //checking if there's an duplicated element
      const isAvailable = prevCartItems.some(
        (cartItem) => cartItem.itemId === nextMenuItem.itemId,
      );

      if (isAvailable) {
        return prevCartItems.map((cartItem) =>
          cartItem.itemId === nextMenuItem.itemId
            ? { ...cartItem, quantity: cartItem.quantity + qty }
            : cartItem,
        );
      }

      //if no duplicate cart item exists
      return [...prevCartItems, { ...nextMenuItem, quantity: qty }];
    });
  }, []);

  // Function to handle the + and - clicks directly inside the Cart UI
  const changeQuantity = useCallback(
    (menuId, change) =>
      setCartItems((prevCartItems) => {
        return (
          prevCartItems
            .map((cartItem) => {
              return cartItem.itemId === menuId
                ? { ...cartItem, quantity: cartItem.quantity + change }
                : cartItem;
            })
            // If a user clicks minus and quantity drops to 0, completely remove it from the array
            .filter((eachItem) => eachItem.quantity > 0)
        );
      }),
    [],
  );

  const removeFromCart = useCallback(
    (menuId) =>
      setCartItems((prevCartItems) =>
        prevCartItems.filter((eachItem) => eachItem.itemId !== menuId),
      ),
    [],
  );

  const value = useMemo(
    () => ({ itemsInCart, addToCart, changeQuantity, removeFromCart }),
    [itemsInCart, addToCart, changeQuantity, removeFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartItemsContext;
