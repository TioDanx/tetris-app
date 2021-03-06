import React from "react";
import Cell from "../Cell/Cell";
import { StyledStage } from "./StyledStage";

const Stage = ({ stage, children }) => {
  return (
    <>
      <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map((row) =>
          row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )}
      </StyledStage>
      {children}
    </>
  );
};
export default Stage;
