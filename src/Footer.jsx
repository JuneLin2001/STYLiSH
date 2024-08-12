import styled from "styled-components";
const MediaMobile = `@media screen and (max-width: 1279px)`;
import facebook from "/images/facebook.png";
import twitter from "/images/twitter.png";
import line from "/images/line.png";

export const FooterStyle = styled.footer`
  width: 100vw;
  height: 115px; /*固定footer高度為115 */
  background: #313538;
  color: #f5f5f5;
  display: flex;
  justify-content: center;
  ${MediaMobile} {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1160px;
  ${MediaMobile} {
    position: absolute;
    left: 0;
    width: 100vw;
    height: 146px; /*寫死 */
    bottom: 60px; /*寫死 */
    background-color: #313538;
    justify-content: center;
  }
`;
export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  width: 670px; /*在1280下維持關於Stylish不換行，符合Figma要寫死在670 */
  height: 22px;
  font-size: 16px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  margin-left: 60px;
  margin-right: 101px;
  ${MediaMobile} {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 177px;
    height: 76px;
    padding: 0;
    font-size: 14px;
    box-sizing: border-box;
  }
`;

export const Contents = styled.div`
  position: relative;
  flex: 1;
  text-align: center;
  width: 20%;
  padding-left: 5px;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 35%;
    right: -7px;
    height: 50%;
    border-right: 1px solid #f5f5f5;
    box-sizing: border-box;
  }
  ${MediaMobile} {
    box-sizing: border-box;
    text-align: left;
    padding: 0;
    color: white;
    width: 105px;
    height: 15px;
    margin-bottom: 7px;
    margin-right: 10px;
    flex: 0;
    &:not(:last-child)::after {
      display: none;
    }
  }
`;
export const MediaBtns = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  margin-right: 60px;
  ${MediaMobile} {
    margin-right: 32px;
  }
`;
export const MediaBtn = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 30px;
  ${MediaMobile} {
    width: 20px;
    height: 20px;
    margin-right: 14px;
  }
`;

export const Copyright = styled.span`
  width: 149px;
  height: 17px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  color: #828282;
  ${MediaMobile} {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 56%;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #828282;
    margin: 30px 0px;
  }
`;
const Footer = () => (
  <FooterStyle>
    <FooterTop>
      <Content>
        <Contents>關於 STYLiSH</Contents>
        <Contents>服務條款</Contents>
        <Contents>隱私政策</Contents>
        <Contents>聯絡我們</Contents>
        <Contents>FAQ</Contents>
      </Content>
      <MediaBtns>
        <MediaBtn src={facebook}></MediaBtn>
        <MediaBtn src={twitter}></MediaBtn>
        <MediaBtn src={line}></MediaBtn>
        <Copyright>&copy; 2018. All rights reserved.</Copyright>
      </MediaBtns>
    </FooterTop>
  </FooterStyle>
);

export default Footer;
