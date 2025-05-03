/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { OrderContext } from "../../ContextAPIs/OrderProvider";

const CartItems = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(OrderContext);

  return (
    <div className="w-full lg:w-[58%] bg-white border-2">
      <table className="overflow-x-auto w-full">
        <thead>
          <tr className="border-b-4 border-gray-300">
            <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">Course</th>
            <th className="text-[14.4px] font-bold p-[7px] text-black">Price</th>
            <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
            <th className="text-[14.4px] font-bold p-[7px] text-black">Sub Total</th>
          </tr>
        </thead>

        <tbody className="overflow-x-auto">
          {cart.map((item, index) => (
            <tr key={index} className="border-b border-gray-300 overflow-x-auto">
              <td>
                <div className="flex items-center justify-center">
                  <div className="w-[20%] text-center flex items-center justify-center">
                    <RiDeleteBin5Line
                      className="text-xl hover:text-footer_color cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                  <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                    <div className="mask">
                      <img
                        className="h-[40px] w-[70px] object-cover"
                        src={item.photo}
                        alt={item.course_name}
                      />
                    </div>
                    <p className="text-[14.4px] px-[7px] text-center flex flex-col">
                      {item.course_name}
                      <span className="text-xs text-gray-500">
                        {item.trainer_data?.name || "No Trainer"}
                      </span>
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                  ৳{item.discount_price || item.regular_price}
                </p>
              </td>
              <td>
                <div className="flex justify-center">
                  <div className="border">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-4 w-[30px] font-bold font_standard my-1.5"
                    >
                      -
                    </button>
                  </div>
                  <div className="border-y">
                    <input
                      type="number"
                      value={item.quantity}
                      className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                      readOnly
                    />
                  </div>
                  <div className="border">
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-4 w-[30px] font-bold font_standard my-1.5"
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                  ৳{(item.discount_price || item.regular_price) * item.quantity}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItems;