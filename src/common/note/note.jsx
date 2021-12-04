import React from 'react';
import './note.scss';

const Note = () => {
    return(
        <div className='note_container'>
            <div className='note_wrapper'>
                <textarea className='title_section' name="title" id="title" placeholder='Title'></textarea>
                <textarea className='title_section' name="note" id="note" placeholder='Take a note...'></textarea>
            </div>
        </div>
    );
};

export default Note;