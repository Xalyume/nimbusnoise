import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useCurrentSong } from '../../context/SongPlayer'

import css from './Footer.module.css'

function FooterMediaPlayer() {
    const { currentSong } = useCurrentSong();

    return (
        <div className={css.footer_container}>
            <ReactAudioPlayer
                src={currentSong}
                controls
                volume={.5}
                id="media_player"
                style={{ width: '80%',}}
            />
        </div>
    )
}

export default FooterMediaPlayer
