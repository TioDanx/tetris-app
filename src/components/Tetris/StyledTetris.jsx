import styled from "styled-components";
import bgImage from "../../assets/bg.jpg";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: auto;
`;

export const StyledTetris = styled.div`
  @media only screen and (min-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    margin: 0 auto;
    max-width: 80vw;

    aside {
      width: 30vw;
      max-width: 200px;
      min-width: 130px;
      display: block;
      padding: 0 20px;
    }
  }

  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;

    aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
    }

    aside div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100vw;
    }
  }
`;
