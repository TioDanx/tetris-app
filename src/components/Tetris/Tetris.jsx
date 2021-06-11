import React, { useState } from "react";
//Components
import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";

//Styled Components
import { StyledTetris, StyledTetrisWrapper } from "./StyledTetris";
import {StyledButton} from "./StyledButton"

//Custom Hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useInterval } from "../../hooks/useInterval";
import { createStage, checkCollision } from "../../gameHelpers";
import { useGameStatus } from "../../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused,setIsPaused] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };
  const startGame = () => {
    //Reset Everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    setDropTime(1000);
    setScore(0);
    setLevel(0);
    setRows(0);
  };

  const pauseGame = () => {
    isPaused ? setDropTime(1000) : setDropTime(null);
    setIsPaused(!isPaused);
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000);
      }
    }
  };
  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };
  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else if (player.pos.y < 1) {
      console.log("Game Over");
      setGameOver(true);
      setDropTime(null);
    } else {
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage {...{ stage }}>
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Level: ${level}`} />
                <Display text={`Rows: ${rows}`} />
                <Display><StyledButton onClick={() => pauseGame()}>{isPaused ? "Resumir juego" : "Pausar juego"}</StyledButton></Display>
              </div>
            )}
            <StartButton callback={startGame} />
          </aside>
        </Stage>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
