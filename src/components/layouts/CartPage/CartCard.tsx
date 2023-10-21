import React from "react";

interface CartCardProps {
  totalPrice: number;
  shipping: number;
  selectedSubTotal: number;
  onClick: () => void;
}

const CartCard: React.FC<CartCardProps> = ({
  totalPrice,
  shipping,
  selectedSubTotal,
  onClick
}) => {
  return (
    <div className="flex flex-col border-2 rounded-lg py-8 px-6 w-full">
      <p className="bold pb-3">Cart Total</p>
      <div className="flex flex-row justify-between py-3">
        <p>SubTotal</p>
        <p>
          {selectedSubTotal.toLocaleString("en-EN", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <div className="flex flex-row justify-between py-3 border-y">
        <p>Shipping</p>
        <p>
          {shipping === 0
            ? "Free"
            : shipping.toLocaleString("en-EN", {
                style: "currency",
                currency: "USD",
              })}
        </p>
      </div>
      <div className="flex flex-row justify-between py-3">
        <p>Total:</p>
        <p>
          {totalPrice.toLocaleString("en-EN", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <button className="px-12 py-4 self-center text-white bg-secondary rounded-md" onClick={onClick}>
        Process To Checkout
      </button>
    </div>
  );
};

export default CartCard;
