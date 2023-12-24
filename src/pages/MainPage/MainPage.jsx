import tracksList from "../../assets/tracksList";
import { useState } from "react";
import Track from "../../components/Track/Track";
import style from "./mainPage.module.scss";
import { Input } from "@mui/material"
import Playbar from "../../components/Playbar/Playbar.jsx";
import SoundVisualization from "../../components/SoundVisualization/SoundVisualization.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const runSearch = (query) => {
    if (!query) {
        return tracksList;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    return tracksList.filter(track => track.title.toLowerCase().includes(lowerCaseQuery) || track.artists.toLowerCase().includes(lowerCaseQuery))
}

const MainPage = () => {
    const [tracks, setTracks] = useState(tracksList);

    const handleChange = (e) => {
        const filteredTracks = runSearch(e.target.value);
        setTracks(filteredTracks);
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.search}>
                    <Input 
                    className={style.input} 
                    placeholder="Search"
                    onChange={handleChange}
                    />
                    <div className={style.list}>
                        {tracks.map((track) => <Track key={track.id} {...track}/>)}
                    </div>
                </div>
                <SoundVisualization /> 
            </div> 
            <Playbar />
        </>
    )
};

export default MainPage;