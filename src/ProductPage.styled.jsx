import styled from "styled-components";

const MediaMobile = `@media screen and (max-width: 1279px)`;

export const Section = styled.section`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100vw;
  ${MediaMobile} {
    padding-bottom: 238px;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 560px 360px;
  grid-template-rows: 746px 118px 540px 540px 540px 540px;
  gap: 40px 40px;
  grid-template-areas:
    "ApiMainImage ApiTitle"
    "ApiStory ApiStory"
    "ApiImages1 ApiImages1"
    "ApiImages2 ApiImages2"
    "ApiImages3 ApiImages3"
    "ApiImages4 ApiImages4";
  margin: 160px auto;
  width: 960px;
  height: auto;
  padding: 0;
  z-index: 3;
  ${MediaMobile} {
    margin: 0 24px;
    width: auto;
    padding-bottom: 32px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, auto);
    gap: 14px;
    grid-template-areas:
      "ApiMainImage "
      "ApiTitle "
      "ApiStory "
      "ApiImages1 "
      "ApiImages2 "
      "ApiImages3 "
      "ApiImages4 ";
  }
`;

export const ApiMainImage = styled.img`
  width: 560px;
  ${MediaMobile} {
    width: 100%;
    height: auto;
  }
`;

export const ApiStory = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". MoreImformationSplit"
    "ApiStoryWord ApiStoryWord";
  grid-area: ApiStory;
  ${MediaMobile} {
    grid-template-columns: 147px 1fr;
    grid-template-rows: 1fr;
  }
`;

export const ApiImages = styled.img`
  grid-area: ${(props) => props.$gridApiImages};
  width: 960px;
  ${MediaMobile} {
    width: 100%;
    height: auto;
  }
`;

export const ApiTitle = styled.div`
  display: grid;
  grid-template-columns: 360px;
  grid-template-rows: 174px 258px 245px;
  gap: 30px 0px;
  grid-template-areas:
    "ApiTitleIdPrice"
    "ApiColorSizeNumAddbtn"
    "ApiNote";
  grid-area: ApiTitle;
`;

export const ApiTitleIdPrice = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 54px 64px 56px;
  gap: 0px 0px;
  grid-template-areas:
    "."
    "."
    ".";
  grid-area: ApiTitleIdPrice;
`;
export const DataTitle = styled.p`
  font-size: 32px;
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  ${MediaMobile} {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
  }
`;

export const DataID = styled.p`
  margin-top: 0;
  margin-bottom: 40px;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #bababa;
  ${MediaMobile} {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
  }
`;

export const DataPrice = styled.p`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 30px;
  line-height: 36px;
  color: #3f3a3a;
  ${MediaMobile} {
    font-size: 20px;
    line-height: 24px;
  }
`;
export const DataPriceSplit = styled.div`
  width: 360px;
  height: 0px;
  border: 1px solid #3f3a3a;
  box-sizing: border-box;
  ${MediaMobile} {
    width: 90vw;
  }
`;

export const ApiColorSizeNumAddbtn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 66px 58px 70px 104px;
  grid-area: ApiColorSizeNumAddbtn;
`;
export const ApiNote = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ".";
  grid-area: ApiNote;
`;
export const ApiStoryWord = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ".";
  grid-area: ApiStoryWord;
  font-size: 20px;
  line-height: 30px;
  color: #3f3a3a;
  ${MediaMobile} {
    font-size: 14px;
    line-height: 25px;
    max-width: 90vw;
  }
`;

export const DataNote = styled.p`
  font-size: 20px;
  line-height: 30px;
  color: #3f3a3a;
  ${MediaMobile} {
    font-size: 14px;
    line-height: 24px;
  }
`;

export const MoreImformation = styled.div`
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 3px;
  color: #8b572a;
  ${MediaMobile} {
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 3.2px;
  }
`;

export const MoreImformationSplit = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ".";
  grid-area: MoreImformationSplit;
  width: 761px;
  height: 0px;
  border: 1px solid #3f3a3a;
  box-sizing: border-box;
  margin-top: 14px;
  ${MediaMobile} {
    width: auto;
    height: 0px;
    border: 1px solid #3f3a3a;
    box-sizing: border-box;
    margin-top: 14px;
  }
`;

export const DataColorsAndSize = styled.ul`
  padding-left: 0;
  margin: 0;
`;

export const DataColorAndSizeTitle = styled.li`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #3f3a3a;
  background-color: transparent;
  margin-right: 24px;
  cursor: auto;
  ${MediaMobile} {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 2.8px;
  }
`;

export const DataColor = styled.li`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.$dataColor};
  padding-left: 24px;
  margin-right: 32px;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  box-shadow: ${(props) => props.$colorBorder};
`;

export const DataSize = styled.li`
  background-color: ${(props) => props.$sizeColor || "#ECECEC"};
  color: ${(props) => props.$textColor || "#3f3a3a"};
  border-radius: 18px;
  box-sizing: border-box;
  height: 36px;
  width: 36px;
  display: inline-block;
  padding-top: 5px;
  margin-right: 20px;
  display: inline-flex;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.25 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

export const DataNumTitle = styled.li`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #3f3a3a;
  background-color: transparent;
  margin-right: 24px;
  cursor: auto;
  ${MediaMobile} {
    display: none;
  }
`;
export const DataNumBtn = styled.div`
  display: inline-flex;
  border: 1px solid #979797;
  width: 160px;
  height: 44px;
  opacity: ${(props) => (props.$chooseSize ? 1 : 0.3)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "auto")};
  ${MediaMobile} {
    width: 90vw;
  }
`;

export const DataNum = styled.span`
  width: 118px;
  height: 44px;
  color: #8b572a;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MediaMobile} {
    width: 90vw;
  }
`;

export const DataNumPlusAndMinus = styled.button`
  width: 21px;
  height: 44px;
  background-color: transparent;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  ${MediaMobile} {
    width: 98px;
  }
`;

export const AddToCart = styled.button`
  box-sizing: border-box;
  width: 360px;
  height: 64px;
  background: #000000;
  border: 1px solid #979797;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: #ffffff;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  ${MediaMobile} {
    width: 90vw;
  }
`;
