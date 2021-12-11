import React from 'react';
import './note-action.scss';
import Paint from '../../assets/icons/paint_box.svg';
import Archive from '../../assets/icons/archive.svg';
import Trash from '../../assets/icons/trash.svg';

const NoteAction = (props) => {

    const { note, setNote, onOutsideClick, handleInput } = props;

    const handleArchive = () => {
        setNote({
            ...note,
            isArchived: note.isArchived === 0 ? 1 : 0
        })
    }

    return (
        <div className='notes_option'>
            <div className='icon paint_icon'><img src={Paint} /></div>
            <div className='icon archive_icon' onClick={() => handleArchive()}><img src={Archive} /></div>
            {/* <div className='icon trash_icon' onClick={() => handleInput(null)}><img src={Trash} /></div> */}
            <div className='close' onClick={onOutsideClick}>Close</div>
        </div>
    );
}

export default NoteAction;