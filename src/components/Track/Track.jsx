import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import cn from "classnames";



const Track = (track) => {
    const { id, src, preview, title, artists, duration } = track;

    const { isPlaying, curTrack, handleToggleAudio } = useContext(AudioContext);

    const isCurTrack = curTrack.id === track.id;

    const formattedDuration = secondsToMMSS(duration);

    return (
        <div className={cn(style.track, isCurTrack && style.playing)}>
            <IconButton onClick={() => handleToggleAudio(track)}>
                {isCurTrack && isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <img className={style.preview} src={preview} alt={`preview for music ${title} by ${artists}`} />
            <div className={style.credits}>
                <b className={style.track__title}>{title}</b>
                <p className={style.track__subtitle}>{artists}</p>
            </div>
            <p>{formattedDuration}</p>
        </div>

    )
}

export default Track;


