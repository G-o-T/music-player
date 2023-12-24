import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import Footer from "../Footer/Footer";

const TimeControls = () => {

    const { audio, curTrack } = useContext(AudioContext);
    const { duration } = curTrack;

    const [curTime, setCurTime] = useState(0);
    const sliderCurTime = Math.round((curTime / duration) * 100);
    const formattedCurTime = secondsToMMSS(curTime);

    const handleChangeCurTime = (_, value) => {
        const time = Math.round((value / 100) * duration);

        setCurTime(time);
        audio.currentTime = time;
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurTime(audio.currentTime);
        }, 1000);
    },[]);

    return (
        <>
            <p>{formattedCurTime}</p>
                    <Slider 
                    aria-label="time-indicator" 
                    step={1} 
                    min={0} 
                    max={100}
                    value={sliderCurTime}
                    onChange={(_, value) => handleChangeCurTime(_, value)}
                    sx={{
                        height: 4,
                        '& .MuiSlider-thumb': {
                          width: 8,
                          height: 8,
                          transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                          '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                          },
                          '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%
                            }`,
                          },
                          '&.Mui-active': {
                            width: 20,
                            height: 20,
                          },
                        },
                        '& .MuiSlider-rail': {
                          opacity: 0.28,
                        },
                      }}
                    />
        </>
    )
}

const Playbar = () => {

    const { audio, isPlaying, curTrack, handleToggleAudio, playNextAudio, playPrevAudio } = useContext(AudioContext);
    const { preview, title, artists, duration } = curTrack;

    const formattedDuration = secondsToMMSS(duration);
  
    return (
        <div className={style.playbar}>
            <Footer />
            <div className={style.playbarWrapper}>
                <div className={style.trackInfo}>
                    <img className={style.preview} src={preview} alt={`preview for music ${title} by ${artists}`} />
                    <div className={style.credits}>
                        <h4>{title}</h4>
                        <p>{artists}</p>
                    </div>
                </div>
                <div className={style.player}>
                    <div className={style.controls}>
                        <IconButton onClick={() => playPrevAudio(curTrack)}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={() => handleToggleAudio(curTrack)}>
                            {isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={() => playNextAudio(curTrack)}>
                            <SkipNext />
                        </IconButton>
                    </div>
                    <div className={style.slider}>
                        <TimeControls />
                        <p>{formattedDuration}</p>
                    </div>
                </div>
                </div>
        </div>
    )


}

export default Playbar;