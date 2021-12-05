import React from 'react';
import './note.scss';
import Paint from '../../assets/icons/paint_box.svg';
import Archive from '../../assets/icons/archive.svg';
import Trash from '../../assets/icons/trash.svg';

const Note = () => {
    return(
        <div className='note_container'>
            <div className='note_wrapper'>
                <input className='title_section text_1' name="title" id="title" rows='1' placeholder='Title' />
                <textarea className='title_section' name="note" id="note" placeholder='Take a note...'></textarea>
                <div className='notes_option'>
                    <div className='icon paint_icon'><img src={Paint} /></div>
                    <div className='icon archive_icon'><img src={Archive} /></div>
                    <div className='icon trash_icon'><img src={Trash} /></div>
                    <div className='close'>Close</div>
                </div>
            </div>
        </div>
    );
};

export default Note;