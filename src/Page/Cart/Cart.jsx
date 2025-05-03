/* eslint-disable react/react-in-jsx-scope */
import CartItems from "./CartItems";
import CartSummary from "./CartSummery"


const Cart = () => {
    return (
        <div className="m-mt_16px">
          <h1 className="text-sm  md:text-text_xl lg:py-0 font-bold text-center">
            Cart
          </h1>
          <div className="pt-p_16px m-mt_16px">
            <div className="lg:flex items-start gap-3">
              <CartItems />
              <CartSummary />
            </div>
          </div>
        </div>
      );
};

export default Cart;
