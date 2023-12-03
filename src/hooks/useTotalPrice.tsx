import { useEffect, useState } from "react";

const useTotalPrice = (discount : number, price : number) => {
     const [totalPrice, setTotalPrice] = useState<Number>(0);

     useEffect(() => {
        const discountedPrice =
        price - (discount / 100) * price;
        setTotalPrice(discountedPrice);
     }, [discount, price]);

     return totalPrice
}

export default useTotalPrice