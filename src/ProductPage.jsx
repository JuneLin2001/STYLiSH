import React, { useState, useEffect } from "react";
import { useCartStore } from "./store/cart-store";
import {
  Section,
  Container,
  ApiMainImage,
  ApiTitle,
  ApiStory,
  ApiStoryWord,
  MoreImformationSplit,
  ApiTitleIdPrice,
  DataTitle,
  DataID,
  DataPrice,
  ApiColorSizeNumAddbtn,
  ApiNote,
  ApiImages,
  DataPriceSplit,
  DataColorsAndSize,
  DataColor,
  DataColorAndSizeTitle,
  DataSize,
  DataNum,
  DataNumBtn,
  DataNumTitle,
  DataNumPlusAndMinus,
  AddToCart,
  DataNote,
  MoreImformation,
} from "./ProductPage.styled";

const ProductPage = () => {
  const [apiResult, setApiResult] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [stock, setStock] = useState(0);
  const [outOfStockSizes, setOutOfStockSizes] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const { addToCart, cart } = useCartStore();

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("id");
    if (productId) {
      fetch(
        `https://api.appworks-school.tw/api/1.0/products/details?id=${productId}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          const productData = responseJson.data;
          setApiResult(productData);

          const cartItem = cart.find(
            (item) =>
              item.id === productData.id &&
              item.color_code === activeColor &&
              item.size === activeSize
          );

          if (cartItem) {
            console.log("in cart");
            const updatedVariants = productData.variants.map((variant) => {
              if (
                variant.size === cartItem.size &&
                variant.color_code === cartItem.color_code
              ) {
                const newStock = variant.stock - cartItem.quantity;
                if (newStock <= 0) {
                  setOutOfStockSizes((prevSizes) => [
                    ...prevSizes,
                    cartItem.size,
                  ]);
                  return { ...variant, stock: 0 };
                }
                return { ...variant, stock: newStock };
              }
              return variant;
            });
            setApiResult((prevResult) => ({
              ...prevResult,
              variants: updatedVariants,
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [cart, activeColor, activeSize]);

  useEffect(() => {
    if (apiResult && activeSize && activeColor) {
      const selectedStock = apiResult.variants.find(
        (variant) =>
          variant.size === activeSize && variant.color_code === activeColor
      );
      setStock(selectedStock ? selectedStock.stock : 0);
      setQuantity(0);
    }
  }, [activeSize, activeColor, apiResult]);

  const handleColorClick = (colorCode) => {
    if (activeColor !== colorCode) {
      setActiveColor(colorCode);
      setActiveSize(null);
      setQuantity(0);
    }

    const colorVariants = apiResult.variants.filter(
      (variant) => variant.color_code === colorCode
    );

    const sizesOutOfStock = colorVariants
      .filter((variant) => variant.stock === 0)
      .map((variant) => variant.size);

    const cartOutOfStockSizes = cart
      .filter(
        (item) => item.color_code === colorCode && item.id === apiResult.id
      )
      .filter((item) => {
        const variant = colorVariants.find((v) => v.size === item.size);
        return variant && item.quantity >= variant.stock;
      })
      .map((item) => item.size);

    const finalOutOfStockSizes = [
      ...new Set([...sizesOutOfStock, ...cartOutOfStockSizes]),
    ];

    setOutOfStockSizes(finalOutOfStockSizes);
  };

  const handleSizeClick = (size) => {
    if (activeColor && !outOfStockSizes.includes(size)) {
      setActiveSize(size);
    }
  };

  const getStylesSize = (size, selectedSize) => {
    const isActive = size === selectedSize;
    const sizeColor = isActive ? "#000000" : "#ECECEC";
    const textColor = isActive ? "#FFFFFF" : "#3f3a3a";
    return { sizeColor, textColor };
  };

  const getColorBorder = (colorCode) =>
    colorCode === activeColor ? "0 0 0 5px #fff, 0 0 0 6px #979797" : "none";

  const adjustQuantity = (amount) => {
    if (activeSize) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + amount;
        return Math.min(Math.max(newQuantity, 0), stock);
      });
    }
  };

  const getButtonText = () => {
    if (!activeColor) {
      return "先選擇顏色";
    }
    if (!activeSize) {
      return "再選擇尺寸";
    }
    if (quantity === 0) {
      return "最後選擇數量";
    }
    return "加入購物車";
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      const colorName = apiResult.colors.find(
        (color) => color.code === activeColor
      ).name;
      addToCart({
        title: apiResult.title,
        id: apiResult.id,
        image: apiResult.main_image,
        price: apiResult.price,
        quantity: quantity,
        maxStock: stock,
        color_code: activeColor,
        colorName: colorName,
        size: activeSize,
      });

      const updatedVariants = apiResult.variants.map((variant) => {
        if (variant.size === activeSize && variant.color_code === activeColor) {
          const newStock = variant.stock - quantity;
          if (newStock <= 0) {
            setOutOfStockSizes((prevSizes) => [...prevSizes, activeSize]);
            return { ...variant, stock: 0 };
          }
          return { ...variant, stock: newStock };
        }
        return variant;
      });

      setApiResult((prevResult) => ({
        ...prevResult,
        variants: updatedVariants,
      }));

      setStock(
        updatedVariants.find(
          (variant) =>
            variant.size === activeSize && variant.color_code === activeColor
        )?.stock || 0
      );
      alert("已加入商品");
      setActiveColor(null);
      setActiveSize(null);
      setQuantity(0);
    }
  };

  if (
    !apiResult ||
    !Array.isArray(apiResult.images) ||
    !apiResult.images.length
  ) {
    return <div>Loading...</div>;
  }

  return (
    <Section>
      <Container>
        <ApiMainImage src={apiResult.main_image} alt={apiResult.title} />
        <ApiTitle>
          <ApiTitleIdPrice>
            <DataTitle>{apiResult.title}</DataTitle>
            <DataID>{apiResult.id}</DataID>
            <DataPrice>TWD.{apiResult.price}</DataPrice>
            <DataPriceSplit />
          </ApiTitleIdPrice>
          <ApiColorSizeNumAddbtn>
            <DataColorsAndSize>
              <DataColorAndSizeTitle>顏色｜</DataColorAndSizeTitle>
              {apiResult.colors.map((color) => (
                <DataColor
                  key={color.code}
                  $dataColor={`#${color.code}`}
                  $colorBorder={getColorBorder(color.code)}
                  onClick={() => handleColorClick(color.code)}
                />
              ))}
            </DataColorsAndSize>
            <DataColorsAndSize>
              <DataColorAndSizeTitle>尺寸｜</DataColorAndSizeTitle>
              {apiResult.sizes.map((size) => {
                const sizeStyles = getStylesSize(size, activeSize);
                return (
                  <DataSize
                    key={size}
                    $sizeColor={sizeStyles.sizeColor}
                    $textColor={sizeStyles.textColor}
                    onClick={() => handleSizeClick(size)}
                    $disabled={outOfStockSizes.includes(size) || !activeColor}
                  >
                    {size}
                  </DataSize>
                );
              })}
            </DataColorsAndSize>
            <DataColorsAndSize>
              <DataNumTitle>數量｜</DataNumTitle>
              <DataNumBtn $chooseSize={activeSize} $disabled={!activeSize}>
                <DataNumPlusAndMinus
                  onClick={() => adjustQuantity(-1)}
                  $disabled={!activeSize}
                >
                  -
                </DataNumPlusAndMinus>
                <DataNum>{quantity}</DataNum>
                <DataNumPlusAndMinus
                  onClick={() => adjustQuantity(1)}
                  $disabled={!activeSize}
                >
                  +
                </DataNumPlusAndMinus>
              </DataNumBtn>
            </DataColorsAndSize>
            <AddToCart onClick={handleAddToCart} $disabled={quantity === 0}>
              {getButtonText()}
            </AddToCart>
          </ApiColorSizeNumAddbtn>
          <ApiNote>
            <DataNote>
              {apiResult.note}
              <br />
              <br />
              {apiResult.texture} <br />
              {apiResult.description.split("\r\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line} <br />
                </React.Fragment>
              ))}
              <br />
              清洗：{apiResult.wash} <br />
              產地：{apiResult.place}
            </DataNote>
          </ApiNote>
        </ApiTitle>
        <ApiStory>
          <MoreImformation>更多產品資訊</MoreImformation>
          <MoreImformationSplit />
          <ApiStoryWord>{apiResult.story}</ApiStoryWord>
        </ApiStory>
        {apiResult.images.map((image, index) => (
          <ApiImages
            key={index}
            src={image}
            $gridApiImages={`ApiImages${index + 1}`}
          />
        ))}
      </Container>
    </Section>
  );
};

export default ProductPage;
