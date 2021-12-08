import React from 'react';
import './note-bar.scss';

const NoteBar = (props) => {

    const { setChangeNote } = props;

    return (
        <div className='note_bar_container'>
            <input type="text" placeholder='Take a note...' autoFocus onClick={() => setChangeNote(true)} />
        </div>
    );
};

export default NoteBar;