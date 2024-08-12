import cartRemoveImage from "/images/cart-remove.png";
import cartRemoveHoverImage from "/images/cart-remove-hover.png";
import { useCartStore } from "./store/cart-store";
import { useState } from "react";
import Form from "./CheckoutPageForm";

const CheckoutPage = () => {
  const { cart, removeFromCart } = useCartStore();
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      const key = `${item.id}+${item.color_code}+${item.size}`;
      acc[key] = item.quantity;
      return acc;
    }, {})
  );
  const handleQuantityChange = (itemId, colorCode, size, quantity) => {
    const key = `${itemId}+${colorCode}+${size}`;
    setQuantities((prevState) => ({
      ...prevState,
      [key]: quantity,
    }));
  };
  const handleRemoveClick = (cartStore) => {
    removeFromCart(cartStore.id, cartStore.color_code, cartStore.size);
    console.log("reMov");
  };

  const generateOptions = (stock) => {
    const options = [];
    for (let i = 1; i <= stock; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, cartStore) => {
      const key = `${cartStore.id}+${cartStore.color_code}+${cartStore.size}`;
      const quantity = quantities[key] || 1;
      const itemTotalPrice = cartStore.price * quantity;
      return total + itemTotalPrice;
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  let deliveryFee = cart.length === 0 ? 0 : 30;

  // const handleFormSubmit = (form) => {
  //   form.preventDefault();
  // }

  return (
    <>
      <div className="flex mx-6">
        <div className="flex flex-col xl:mt-[175px] xl:mx-auto xl:pl-4 box-border">
          <div className="flex">
            <p className="w-12 font-bold leading-[19px] box-border">購物車</p>
            <p className="w-[32px] hidden leading-[19px] ml-[490px] xl:block">
              數量
            </p>
            <p className="w-[32px] hidden leading-[19px] ml-40 xl:block">
              單價
            </p>
            <p className="w-[32px] hidden leading-[19px] ml-40 xl:block">
              小計
            </p>
          </div>
          {/* <button
            className={`bg-[url(/images/cart-remove.png)] hover:bg-[url("/images/cart-remove-hover.png")] order-2 xl:order-3 w-11 h-11 self-center`}
          /> */}
          <div className=" border-none xl:border-solid border-[1px] border-[#979797] xl:w-[1160px] h-auto box-border">
            <div className="pt-10 pb-[10px]">
              {cart.map((cartStore) => {
                const key = `${cartStore.id}+${cartStore.color_code}+${cartStore.size}`;
                const quantity = quantities[key];
                const totalPrice = cartStore.price * quantity;
                return (
                  <div
                    key={`${cartStore.id}+${cartStore.color_code}+${cartStore.size}`}
                    className="justify-between xl:justify-start xl:w-[1100px] h-[152px] flex flex-wrap xl:mx-[30px] mt-[10px] xl:mt-0 mb-[119px] xl:mb-[30px] mr-[5vw]  xl:border-none border-solid border-0 border-t-2 border-black pt-5 xl:pt-0"
                  >
                    <div className="order-1 flex xl:mr-0">
                      <img
                        src={cartStore.image}
                        className="w-[114px] h-[152px] "
                      ></img>
                      <div className="w-36 h-36 ml-4">
                        <p className="mt-0 mb-[18px] leading-[19px]">
                          {cartStore.title}
                        </p>
                        <p className="mt-0 mb-[22px] leading-[19px]">
                          {cartStore.id}
                        </p>
                        <p className="mt-0 mb-[10px] leading-[19px]">
                          顏色｜{cartStore.colorName}
                        </p>
                        <p className="my-0 leading-[19px]">
                          尺寸｜{cartStore.size}
                        </p>
                      </div>
                    </div>
                    <div className="order-3 xl:order-2 flex justify-between w-[90vw] xl:w-auto">
                      <div className="xl:text-center flex flex-col justify-center items-center">
                        <label className="block mr-auto xl:hidden xl:mr-[119px]">
                          數量
                        </label>
                        <select
                          className="xl:ml-[210px] pl-2 w-20 h-8 m-0 box-border bg-[#F3F3F3] border-[1px] border-[solid] border-[#979797] rounded-[8px]"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              cartStore.id,
                              cartStore.color_code,
                              cartStore.size,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {generateOptions(cartStore.maxStock)}
                        </select>
                      </div>
                      <div className="xl:ml-24 xl:w-28 flex flex-col justify-center items-center text-center">
                        <p className="block mr-auto xl:mr-40 xl:hidden ">
                          單價
                        </p>
                        <p className="mr-auto xl:mr-[0px]">
                          TWD.{cartStore.price}
                        </p>
                      </div>
                      <div className="xl:ml-14 xl:w-40 flex flex-col justify-center items-center text-center">
                        <p className="block mr-auto xl:mr-40 xl:hidden">小計</p>
                        <p className="mr-auto xl:mr-[0px]">TWD.{totalPrice}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveClick(cartStore)}
                      className={`xl:ml-[66px] bg-transparent bg-[url(${cartRemoveImage})] hover:bg-[url(${cartRemoveHoverImage})] order-2 xl:order-3 w-11 h-11 xl:self-center`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mx-0 mb-40">
        <Form totalAmount={totalAmount} deliveryFee={deliveryFee} />
      </div>
      <div className="flex "></div>
    </>
  );
};

export default CheckoutPage;
