import React, { useContext, createContext, useState } from 'react';

export const SongPlayer = createContext();

export const SongProvider = (props) => {
    const [currentSong, setCurrentSong] = useState("")
    // const [isPlaying, setIsPlaying] = useState(false)

    return (
        <SongPlayer.Provider value={{ currentSong, setCurrentSong, }}>
            {props.children}
        </SongPlayer.Provider>
    )
}

export const useCurrentSong = () => {
    return useContext(SongPlayer);
}
