import React, { useState, useEffect } from "react";

//Components
import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";
import HighScores from "../HighScores/HighScores";
import AudioBox from "../AudioBox/AudioBox";

//Styled Components
import { StyledTetris, StyledTetrisWrapper } from "./StyledTetris";
import { StyledButton } from "./StyledButton";

//Custom Hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useInterval } from "../../hooks/useInterval";
import { createStage, checkCollision } from "../../gameHelpers";
import { useGameStatus } from "../../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000);
      }
    }
  };

  const dropPlayer = () => {
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
      setIsPaused(false);
      if (keyCode === 65 || keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 68 || keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 83 || keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 87 || keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 27) {
        pauseGame();
      } else if (keyCode === 82 || keyCode === 13) {
        startGame();
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const isMobile = () => {
    return window.screen.width < 1000;
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage {...{ stage }}>
          <aside>
            {gameOver ? (
              <>
                <Display gameOver={gameOver} text="Game Over" />
                <Display text={`Score: ${score}`} />
                <AudioBox />
              </>
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Level: ${level}`} />
                <Display text={`Rows: ${rows}`} />
                <Display>
                  <StyledButton onClick={() => pauseGame()}>
                    {isPaused ? "Resume game" : "Pause Game"}
                  </StyledButton>
                </Display>
              </div>
            )}
            <StartButton callback={startGame} />
            <AudioBox />
          </aside>
        </Stage>
        <HighScores {...{ score }} {...{ gameOver }} />
      </StyledTetris>
      {isMobile() ? (
        <>
          {" "}
          <div className="btns">
            <button className="btn" onClick={() => playerRotate(stage, 1)}>
              Rotate
            </button>
            <button className="btn" onMouseDown={() => drop()}>
              Drop
            </button>
          </div>
          <button className="btn btn-left" onClick={() => movePlayer(-1)}>
            {"<"}
          </button>
          <button className="btn btn-right" onClick={() => movePlayer(1)}>
            {">"}
          </button>
        </>
      ) : (
        " "
      )}
    </StyledTetrisWrapper>
  );
};

export default Tetris;
