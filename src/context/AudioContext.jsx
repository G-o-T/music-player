import { createContext, useState, useRef } from "react";
import tracksList from "../assets/tracksList";

const audio = new Audio(tracksList[0].src);


export const AudioContext = createContext({});

const AudioProvider = ({ children }) => {
    const [curTrack, setCurTrack] = useState(tracksList[0]);
    const [isPlaying, setPlaying] = useState(false);

    const handleToggleAudio = (track) => {
        if (curTrack.id !== track.id) {
            setCurTrack(track);
            setPlaying(true);

            audio.src = track.src;
            audio.currentTime = 0;

            audio.play();

            return;
        }

        if (isPlaying) {
            audio.pause();
            setPlaying(false);
        } else {
            audio.play();
            setPlaying(true);         
        }
    }

    const playNextAudio = (track) => {
        if (track.id < tracksList.length) {
            setCurTrack(tracksList[track.id]);
            setPlaying(true);
            audio.src = tracksList[track.id].src;
            audio.currentTime = 0;
    
            audio.play();
        } else {
            setCurTrack(tracksList[0]);
            setPlaying(true);
            audio.src = tracksList[0].src;
            audio.currentTime = 0;
    
            audio.play();
        }
    }

    const playPrevAudio = (track) => {
        if (track.id === 1) {
            setCurTrack(tracksList[tracksList.length-1]);
            setPlaying(true);
            audio.src = tracksList[tracksList.length-1].src;
            audio.currentTime = 0;
    
            audio.play();
        } else if (track.id < tracksList.length+1) {
            setCurTrack(tracksList[track.id-2]);
            setPlaying(true);
            audio.src = tracksList[track.id-2].src;
            audio.currentTime = 0;

            audio.play();
        }
    }

    const value = { audio, curTrack, isPlaying, handleToggleAudio, playNextAudio, playPrevAudio };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
};

export default AudioProvider;