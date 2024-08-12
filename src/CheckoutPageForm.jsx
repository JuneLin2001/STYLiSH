import PropTypes from "prop-types";
import { useState } from "react";
const Form = ({ totalAmount, deliveryFee }) => {
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    address: false,
    deliveryTime: false,
  });

  const handleFocus = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: false,
    }));
  };

  const validateForm = (formElements) => {
    const errorStates = {
      name: !formElements.name.checkValidity(),
      phone: !formElements.phone.checkValidity(),
      email: !formElements.email.checkValidity(),
      address: !formElements.address.checkValidity(),
      deliveryTime: !formElements["delivery-time"].value,
    };
    return errorStates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const errorStates = validateForm(formElements);
    const allValid = Object.values(errorStates).every((valid) => !valid);
    if (deliveryFee === 0) {
      alert("購物車中沒有商品");
    } else if (!allValid) {
      alert("請填寫所有必填欄位並確保格式正確");
      setErrors(errorStates);
    } else {
      alert("訂單已送出");
    }
  };

  return (
    <div className="flex flex-col xl:mt-[48px] xl:mx-auto xl:pl-4 box-border">
      <div className="xl:w-[1188px] h-auto box-border">
        <form className="group" onSubmit={handleSubmit} noValidate>
          <fieldset className="border-none w-max-screen">
            <legend className="font-bold leading-[19px] box-border mb-0">
              訂購資料
            </legend>
            <hr></hr>
            <div className=" flex flex-wrap xl:">
              <div className="flex mt-4 flex-wrap items-center">
                <label htmlFor="name" className="w-[90vw] xl:w-20 h-6 mr-10">
                  收件人姓名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-[90vw] mt-[10px] xl:w-[576px] h-8 box-border border-[1px] border-solid rounded-[8px] mr-4 ${
                    errors.name ? "border-red-500" : "border-[#979797]"
                  }`}
                  required
                  onFocus={() => handleFocus("name")}
                />
                {errors.name && (
                  <span className="mt-2 text-sm text-red-500">請填寫姓名</span>
                )}
              </div>
              <p className="ml:0 xl:ml-[344px] leading-[19px] text-[#8B572A]">
                務必填寫完整收件人姓名，避免包裹無法順利簽收
              </p>
              <div className="flex mt-2 flex-wrap items-center ">
                <label htmlFor="phone" className="w-[90vw] xl:w-20 h-6 mr-10">
                  手機
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  minLength="9"
                  maxLength="14"
                  className={`w-[90vw] mt-[10px] xl:w-[576px] h-8 box-border border-[1px] border-solid rounded-[8px] mr-4 ${
                    errors.phone ? "border-red-500" : "border-[#979797]"
                  }`}
                  required
                  pattern="^09\d{8}$|^\d{9}$"
                  onFocus={() => handleFocus("phone")}
                />
                {errors.phone && (
                  <span className="mt-2 text-sm text-red-500">
                    手機格式錯誤
                  </span>
                )}
              </div>
              <div className="flex mt-5 flex-wrap items-center ">
                <label htmlFor="address" className="w-[90vw] xl:w-20 h-6 mr-10">
                  地址
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className={`w-[90vw] mt-[10px] xl:w-[576px] h-8 box-border border-[1px] border-solid rounded-[8px] mr-4 ${
                    errors.address ? "border-red-500" : "border-[#979797]"
                  }`}
                  required
                  onFocus={() => handleFocus("address")}
                  pattern="^.{3,}$"
                />
                {errors.address && (
                  <span className="mt-2 text-sm text-red-500">地址過短</span>
                )}
              </div>
              <div className="flex mt-5 flex-wrap items-center ">
                <label htmlFor="email" className="w-[90vw] xl:w-20 h-6 mr-10">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-[90vw] mt-[10px] xl:w-[576px] h-8 box-border border-[1px] border-solid rounded-[8px] mr-4 ${
                    errors.email ? "border-red-500" : "border-[#979797]"
                  }`}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onFocus={() => handleFocus("email")}
                />
                {errors.email && (
                  <span className="mt-2 text-sm text-red-500">
                    電子信箱錯誤
                  </span>
                )}
              </div>
              <div className="flex mt-[30px] flex-wrap items-center">
                <label htmlFor="delivery-time" className="xl:w-20 h-6 mr-10">
                  配送時間
                </label>
                <div>
                  <input
                    className="ml-0 w-4 h-4"
                    type="radio"
                    id="delivery-time-1"
                    name="delivery-time"
                    value="08:00-12:00"
                    required
                    onFocus={() => handleFocus("deliveryTime")}
                  />
                  <label htmlFor="delivery-time-1" className="ml-[6px]">
                    08:00-12:00
                  </label>
                  <input
                    className="ml-5 xl:ml-8 w-4 h-4"
                    type="radio"
                    id="delivery-time-2"
                    name="delivery-time"
                    value="14:00-18:00"
                    onFocus={() => handleFocus("deliveryTime")}
                  />
                  <label htmlFor="delivery-time-2" className="ml-[6px]">
                    14:00-18:00
                  </label>
                  <input
                    className="ml-5 xl:ml-8 w-4 h-4"
                    type="radio"
                    id="delivery-time-3"
                    name="delivery-time"
                    value="不指定"
                    onFocus={() => handleFocus("deliveryTime")}
                  />
                  <label htmlFor="delivery-time-3" className="ml-[6px]">
                    不指定
                  </label>
                  {errors.deliveryTime && (
                    <span className="mt-2 text-sm text-red-500 ml-4">
                      請選擇配送時間
                    </span>
                  )}
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="border-none mt-10">
            <legend className="font-bold leading-[19px] box-border">
              付款資料
            </legend>
            <hr className="mb-0" />
            <div className="flex flex-wrap">
              <div className="flex mt-4 flex-wrap items-center ">
                <label className="w-[90vw] xl:w-20 h-6 mr-10">信用卡號碼</label>
                <input
                  type="text"
                  placeholder="**** **** **** ****"
                  className="w-[90vw] mt-[10px] xl:w-[576px] h-8 box-border border-[1px] border-[solid] border-[#979797] rounded-[8px] mr-4"
                />
              </div>
              <div className="flex mt-5 flex-wrap items-center ">
                <label className="w-[90vw] xl:w-20 h-6 mr-10">有效期限</label>
                <input
                  type="text"
                  className="w-[90vw] mt-[10px] xl:w-[576px] h-8 box-border border-[1px] border-[solid] border-[#979797] rounded-[8px] mr-4"
                  placeholder="MM / YY"
                />
              </div>
              <div className="flex mt-5 flex-wrap items-center ">
                <label className="w-[90vw] xl:w-20 h-6 mr-10">安全碼</label>
                <input
                  type="text"
                  className="w-[90vw] mt-[10px] xl:w-[576px] h-8 box-border border-[1px] border-[solid] border-[#979797] rounded-[8px] mr-4"
                  placeholder="後三碼"
                />
              </div>
            </div>
          </fieldset>
          <div className="flex flex-wrap box-border w-60 h-[159px] ml-auto xl:pl-1 mt-7 xl:mr-4 mr-12 xl:mb-[58px] mb-[51px]">
            <div className="flex justify-between w-full h-9 mb-5">
              <p className="w-16 h-5 mt-1">總金額</p>
              <div className="flex">
                <span className="my-1 mr-2">NT.</span>
                <p className="text-3xl my-0 ">{totalAmount}</p>
              </div>
            </div>
            <div className="flex justify-between w-full h-9 mb-5 pb-5 border-solid border-0 border-b-2 border-black ">
              <p className="w-16 h-5 mt-1">運費</p>
              <div className="flex">
                <span className="my-1 mr-2">NT.</span>
                <p className="text-3xl my-0">{deliveryFee}</p>
              </div>
            </div>
            <div className="flex justify-between w-full h-9 xl:mb-60">
              <p className="w-16 h-5 mt-1">應付金額</p>
              <div className="flex">
                <span className="my-1 mr-2">NT.</span>
                <p className="text-3xl my-0">{`${
                  totalAmount + deliveryFee
                }`}</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="block self-center mx-auto w-[95vw] h-16 bg-black text-white text-xl leading-[30px] tracking-[4px] xl:mb-0 mb-[74px] xl:w-60 xl:ml-auto xl:mr-4"
          >
            確認付款
          </button>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
};

export default Form;
