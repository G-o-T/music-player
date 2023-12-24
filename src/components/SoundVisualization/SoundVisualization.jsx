import { AudioContext } from "../../context/AudioContext";

import { useRef, useContext, useEffect, useState } from "react";
import style from "./soundVisualization.module.scss";

import track1 from "../../assets/store/track1.mp3";
import track2 from "../../assets/store/track2.mp3";
import track3 from "../../assets/store/track3.mp3";
import track4 from "../../assets/store/track4.mp3";
import track5 from "../../assets/store/track5.mp3";
import track6 from "../../assets/store/track6.mp3";
import track7 from "../../assets/store/track7.mp3";
import track8 from "../../assets/store/track8.mp3";
import track9 from "../../assets/store/track9.mp3";
import track10 from "../../assets/store/track10.mp3";
import track11 from "../../assets/store/track11.mp3";
import track12 from "../../assets/store/track12.mp3";
import track13 from "../../assets/store/track13.mp3";
import track14 from "../../assets/store/track14.mp3";



let animationController;

const SoundVisualization = () => {
  const canvasRef = useRef();
  const audioRef = useRef();
  const source = useRef();
  const analyzer = useRef();

  let width;
  let height;

  if (window.innerWidth > 1200) {
    width = 600;
    height = 300;
  } else if (window.innerWidth > 1025) {
    width = 400;
    height = 240;
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
    width = 700;
    height = 200;
  } else if (window.innerWidth < 768) {
    width = 300;
    height = 100;
  } else if (window.innerWidth < 360) {
    width = 180;
    height = 80;
  };

  const { isPlaying, audio, curTrack } = useContext(AudioContext);

  const [currentTrack, setCurrentTrack] = useState(null);
  const tracksList = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14];

useEffect(() => {
  if (isPlaying) {
    setCurrentTrack(tracksList[curTrack.id-1]);
    audioRef.current.play();
    audioRef.current.volume = 0.05;
  } else {
    audioRef.current.pause();
    return cancelAnimationFrame(animationController);
  }
}, [isPlaying, currentTrack, curTrack]);

function handleAudioPlay() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();

    if (!source.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current);
      analyzer.current = audioContext.createAnalyser();
      source.current.connect(analyzer.current);
      analyzer.current.connect(audioContext.destination);
    };

    visualizeData();
  };

  function visualizeData () {
    animationController = window.requestAnimationFrame(visualizeData);

    if (audioRef.current.paused) {
      return cancelAnimationFrame(animationController);
    }

    const songData = new Uint8Array(140);
    analyzer.current.getByteFrequencyData(songData);
    const bar_width = 1;
    let start = 0;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (let i = 0; i < songData.length; i++) {

      start = i * 16;

      let gradient = ctx.createLinearGradient(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      gradient.addColorStop(0.1, "#674fff");
      gradient.addColorStop(0.25, "#4b90f7");
      gradient.addColorStop(0.5, "#dc17e0 ");
      gradient.addColorStop(1.0, "#fb5a00");


      ctx.fillStyle = gradient;
      ctx.fillRect(start, canvasRef.current.height, bar_width, -songData[i]);
  }
  };


  return (
    <div className={style.visualization}>
        <audio
          ref={audioRef}
          onPlay={handleAudioPlay}
          src={currentTrack}
        />
      <canvas ref={canvasRef} width={width} height={height} className={style.canvas}/>
    </div>
  );
}

export default SoundVisualization;




