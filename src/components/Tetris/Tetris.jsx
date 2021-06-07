import React, { useState } from "react";

//Components
import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";

//Styled Components
import { StyledTetris, StyledTetrisWrapper } from "./StyledTetris";

//Custom Hooks
import {usePlayer} from "../../hooks/usePlayer";
import {useStage} from "../../hooks/useStage";
import { createStage } from "../../gameHelpers";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  const movePlayer = dir => {
    updatePlayerPos({x: dir, y: 0});
  }
  const startGame = () => {
    //Reset Everything
    setStage(createStage());
    resetPlayer();
  }
  const drop = () => {
    updatePlayerPos({x: 0, y: 1});
  }
  const dropPlayer = () => {
    drop();
  }

  const move = ({keycode}) => {
    if (!gameOver){
      if (keycode === 37){
        movePlayer(-1)
      }
      else if(keycode === 39){
        movePlayer(1)
      }
      else if(keycode === 40){
        dropPlayer();
      }
    }
  }
  console.log("re-render");
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)} >
      <StyledTetris>
        <Stage {...{stage}}>
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
              </div>
            )}
            <StartButton onClick={startGame} />
          </aside>
        </Stage>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
