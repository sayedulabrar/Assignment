/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";

const CartSummary2 = () => {
  const { cart } = useContext(OrderContext);
  
  const total = cart.reduce((acc, item) => {
    const price = item.discount_price || item.regular_price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="lg:w-[41%] bg-white border-2">
      <div className="px-[30px]">
        <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
          Cart Summary
        </h2>
        <div className="py-3 flex justify-between border-b border-gray-300">
          <p className="text-black font-bold">Total Price</p>
          <p className="text-black font-bold">৳{total}</p>
        </div>

        <button
          type="submit"
          className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default CartSummary2;