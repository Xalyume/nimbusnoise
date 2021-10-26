import React from 'react';
import { useDispatch } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

import css from './Footer.module.css'

function FooterMediaPlayer() {
    return (
        <div className={css.footer_container}>
            <ReactAudioPlayer
                controls
            />
        </div>
    )
}

export default FooterMediaPlayer
