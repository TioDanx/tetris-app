import React, { useState, useEffect } from "react";
import song from "../../assets/main.mp3";
import playIMG from "../../assets/play.ico";
import pauseIMG from "../../assets/pause.ico";

export const AudioBox = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mainMusic, setMainMusic] = useState(new Audio(song));

  const toggleMusic = () => {
    isPlaying ? mainMusic.pause() : mainMusic.play();
    setIsPlaying(!isPlaying);
  };

  const controlVolume = (vol) => {
    mainMusic.volume = vol / 100;
  };

  useEffect(() => {
    mainMusic.loop = true;
    mainMusic.autoplay = true;
    mainMusic.volume = 0.25;
    return () => {
      mainMusic.pause();
    };
  }, []);

  return (
    <div className="audio-box-container">
      <button onClick={() => toggleMusic()}>
        {" "}
        <img src={isPlaying ? pauseIMG : playIMG} alt="" />
      </button>
      <input
        type="range"
        min="1"
        max="100"
        defaultValue="25"
        onChange={(e) => controlVolume(e.target.value)}
      />
    </div>
  );
};

export default AudioBox;
