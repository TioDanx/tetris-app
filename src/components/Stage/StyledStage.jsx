import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  gap: 1px;
  border: 2px solid #333;
  width: 100%;
  background: #111;
  max-height: 100vh;
  @media only screen and (min-width: 800px) {
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(25vw / ${(props) => props.width})
    );
    max-width: 25vw;
  }

  @media only screen and (max-width: 800px) {
    margin-top: 20px;
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(50vw / ${(props) => props.width})
    );
    max-width: 50vw;
  }
`;
