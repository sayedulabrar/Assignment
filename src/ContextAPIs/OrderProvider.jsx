import { createContext, useRef, useState } from "react";

export const OrderContext = createContext(null)
const OrderProvider = ({ children }) => {

    const [open, setOpen] = useState(true);
    const [cart, setCart] = useState([]); // ✅ NEW
    const sidebarRef = useRef(null);
  
    const addToCart = (course) => {
        const existing = cart.find((c) => c.id === course.id);
        if (existing) {
          // If course already in cart, increase its quantity
          setCart(cart.map(c => c.id === course.id ? { ...c, quantity: c.quantity + 1 } : c));
        } else {
          // Otherwise, add with quantity = 1
          setCart([...cart, { ...course, quantity: 1 }]);
        }
      };
      const increaseQty = (id) => {
        setCart(cart.map(c => c.id === id ? { ...c, quantity: c.quantity + 1 } : c));
      };
      
      const decreaseQty = (id) => {
        setCart(cart.map(c => {
          if (c.id === id && c.quantity > 1) {
            return { ...c, quantity: c.quantity - 1 };
          }
          return c;
        }));
      };
      
    
      const removeFromCart = (id) => {
        setCart(cart.filter((c) => c.id !== id));
      };
    
      return (
        <OrderContext.Provider value={{ cart,increaseQty, decreaseQty, addToCart, removeFromCart, open, setOpen, sidebarRef  }}>
          {children}
        </OrderContext.Provider>
      );
  };
  

export default OrderProvider;