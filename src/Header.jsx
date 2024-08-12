import styled from "styled-components";
import logo from "/images/logo.png";
import searchImage from "/images/search.png";
import searchHoverImage from "/images/search-hover.png";
import cartImage from "/images/cart.png";
import cartHoverImage from "/images/cart-hover.png";
import cartMobileImage from "/images/cart-mobile.png";
import memberImage from "/images/member.png";
import memberHoverImage from "/images/member-hover.png";
import memberMobileImage from "/images/member-mobile.png";
import { useState } from "react";
import { useCartStore } from "./store/cart-store";
import { useNavigate } from "react-router-dom";

const MediaMobile = `@media screen and (max-width: 1279px)`;

const HeaderStyle = styled.header`
  text-align: center;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 140px;
  left: 0;
  top: 0;
  background: #ffffff;
  border-bottom: 40px solid #313538;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${MediaMobile} {
    position: relative;
    width: 100vw;
    height: 52px;
    padding-bottom: 52px;
    border-bottom: 50px solid #313538;
    justify-content: space-between;
    align-items: flex-start;
  }
`;
const Logo = styled.img`
  position: relative;
  width: 258px;
  height: 48px;
  margin-left: 60px;
  cursor: pointer;
  ${MediaMobile} {
    display: ${(props) => (props.$isVisible ? "flex" : "none")};
    position: relative;
    width: 129px;
    height: 24px;
    left: 36px;
    margin-left: 0;
    margin: 14px auto;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    font-size: 14px;
    z-index: 5;
  }
`;
const Categories = styled.ul`
  position: absolute;
  left: 375px;
  top: 28px;
  ${MediaMobile} {
    position: absolute;
    display: flex;
    width: 100%;
    left: 0px;
    right: 0px;
    top: 39px;
    padding: 0;
  }
`;
const Category = styled.li`
  position: relative;
  display: inline;
  font-size: 20px;
  letter-spacing: 30px;
  text-align: center;
  margin-right: 46px;
  &:hover {
    color: #8b572a;
  }
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 35%;
    right: -7px;
    height: 50%;
    border-right: 1px solid #3f3a3a;
    box-sizing: border-box;
  }
  ${MediaMobile} {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 44px;
    order: 2;
    color: #f5f5f5;
    font-size: 16px;
    letter-spacing: 0;
    margin: 0;
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 35%;
      right: -1%;
      height: 35%;
      border-right: 1px solid #f5f5f5;
      margin: 0px;
    }
  }
`;
const HeaderRight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 54px;
  margin-left: auto;
  ${MediaMobile} {
    display: ${(props) => (props.$isVisible ? "none" : "flex")};
  }
`;
const SearchContainer = styled.div`
  display: flex;
  position: relative;
  order: 0;
  margin-bottom: 100px;
  margin-left: 14px;
  ${MediaMobile} {
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 100vw;
    height: 52px;
    margin: 0;
    justify-content: center;
    align-items: center;
  }
`;

const Search = styled.form`
  background-color: white;
  position: absolute;
  right: 11%;
  top: 26px;
  width: 212px;
  height: 44px;
  border: 1px solid #979797;
  border-radius: 30px;
  ${MediaMobile} {
    position: static;
    width: 95%;
  }
`;
const SearchBar = styled.input`
  position: absolute;
  background: none;
  outline: none;
  right: 23%;
  width: 124px;
  height: 8px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  padding: 20px;
  border: 0;
  &::placeholder {
    color: #8b572a;
  }
  ${MediaMobile} {
    right: 0;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    padding: 8px 20px 20px 20px;
    border: 0;
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 95vw;
    height: 52px;
    margin: 0;
    justify-content: center;
    align-items: center;
  }
`;
const SearchBtn = styled.button`
  position: absolute;
  width: 44px;
  height: 44px;
  left: 75%;
  top: 2%;
  background: url(${searchImage});
  border: 0px;
  padding: 0;
  cursor: pointer;
  &:hover {
    background: url(${searchHoverImage});
  }
  ${MediaMobile} {
    display: ${(props) => (props.$isVisible ? "none" : "flex")};
    background-color: #ffffff;
    position: relative;
    left: 0;
    top: -60px;
    padding: 0;
    padding-left: 20px;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 8px 19px 8px auto;
  }
`;

const SearchBtnMobile = styled.button`
  display: none;
  ${MediaMobile} {
    display: flex;
    display: ${(props) => (props.$isVisible ? "flex" : "none")};
    background: url(search);
    width: 40px;
    height: 40px;
    border: 0px;
    margin: 8px 19px 4px 0;
    order: 1;
    cursor: pointer;
    &:hover {
      background: url(${searchHoverImage});
    }
  }
`;

const Tabs = styled.div`
  ${MediaMobile} {
    background-color: #313538;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
    width: 100%;
    height: 60px;
    left: 0px;
    bottom: 0px;
    z-index: 10;
  }
`;
const CartandMemberBtn = styled.button`
  position: relative;
  margin-right: 42px;
  order: 2;
  width: 44px;
  height: 44px;
  background: url(${(props) => props.$img});
  cursor: pointer;
  &:hover {
    background: url(${(props) => props.$hoverImg});
  }
  ${MediaMobile} {
    margin-right: 0px;
    background: url(${(props) => props.$mobileImg});
    background-repeat: no-repeat;
    background-position: 45% 55%;
    display: inline-block;
    width: 50%;
    justify-content: center;
    align-items: center;
    &:hover {
      background-repeat: no-repeat;
      background-position: 45% 55%;
    }
  }
`;

const CartandMemberWord = styled.p`
  width: 48px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
  position: relative;
  margin: 0;
  margin-left: 90px;
  display: inline-block;
  justify-content: center;
  align-items: center;
`;

const CartNum = styled.span`
  position: absolute;
  box-sizing: border-box;
  top: 20px;
  right: -2px;
  height: 24px;
  width: 24px;
  background-color: #8b572a;
  color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  ${MediaMobile} {
    position: absolute;
    margin: 0;
    top: 45%;
    left: 45%;
    background-color: #8b572a;
    color: #ffffff;
    border-radius: 50%;
    display: inline-block;
    justify-content: center;
    align-items: center;
  }
`;

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const cart = useCartStore((state) => state.cart);
  const totalQuantity = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  function handleSearchClick(event) {
    event.preventDefault();
    if (searchValue === "") {
      alert("請輸入關鍵字！");
    } else {
      window.location.href = `homepage.html?search=${encodeURIComponent(
        searchValue
      )}`;
    }
  }

  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <HeaderStyle>
      <Logo
        src={logo}
        $isVisible={isVisible}
        onClick={() => (window.location.href = "homepage.html")}
      />
      <SearchBtnMobile $isVisible={isVisible} onClick={handleToggle} />
      <nav>
        <Categories>
          <Category
            onClick={() =>
              (window.location.href = "homepage.html?category=women")
            }
          >
            女裝
          </Category>
          <Category
            onClick={() =>
              (window.location.href = "homepage.html?category=men")
            }
          >
            男裝
          </Category>
          <Category
            onClick={() =>
              (window.location.href = "homepage.html?category=accessories")
            }
          >
            配件
          </Category>
        </Categories>
      </nav>
      <HeaderRight $isVisible={isVisible}>
        <SearchContainer>
          <Search>
            <SearchBar
              placeholder="西裝"
              value={searchValue}
              onChange={handleChange}
              $isVisible={!isVisible}
            />
            <SearchBtn onClick={handleSearchClick} $isVisible={isVisible} />
          </Search>
        </SearchContainer>
      </HeaderRight>
      <Tabs>
        <CartandMemberBtn
          $img={cartImage}
          $hoverImg={cartHoverImage}
          $mobileImg={cartMobileImage}
          onClick={goToCheckout}
        >
          <CartNum>{totalQuantity}</CartNum>
          <CartandMemberWord>購物車</CartandMemberWord>
        </CartandMemberBtn>
        <CartandMemberBtn
          $img={memberImage}
          $hoverImg={memberHoverImage}
          $mobileImg={memberMobileImage}
        >
          <CartandMemberWord>會員</CartandMemberWord>
        </CartandMemberBtn>
      </Tabs>
    </HeaderStyle>
  );
};

export default Header;
