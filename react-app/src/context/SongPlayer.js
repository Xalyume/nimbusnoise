import React, { useContext, createContext, useState } from 'react';

export const SongPlayer = createContext();

export const SongProvider = (props) => {
    const [currentSong, setCurrentSong] = useState("")
    const [isPlaying, setIsPlaying] = useState()

    return (
        <SongPlayer.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying }}>
            {props.children}
        </SongPlayer.Provider>
    )
}

export const useCurrentSong = () => {
    return useContext(SongPlayer);
}
