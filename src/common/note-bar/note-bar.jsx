import React from 'react';
import './note-bar.scss';

const NoteBar = () => {
    return(
        <div className='note_bar_container'>
            <input type="text" placeholder='Take a note...' />
        </div>
    );
};

export default NoteBar;