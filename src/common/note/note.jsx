import React, { useState } from 'react';
import './note.scss';
import Pin from '../../assets/icons/pin.svg';
import Pinned from '../../assets/icons/pinned.svg';
import { addNote } from '../../services/api';
import { toast } from 'react-toastify';
import autosize from 'autosize';
import OutsideClickHandler from 'react-outside-click-handler';
import NoteAction from '../note-action/note-action';

const Note = (props) => {

    const { colorList, note, setNote, changeNote, setChangeNote, handlePinned, selectedColor, handleColor } = props;
    autosize(document.querySelector('textarea'));

    const handleInput = (inputType) => {
        setNote({
            title: inputType.key == 'title' ? inputType.value : note.title,
            note: inputType.key == 'note' ? inputType.value : note.note,
            isArchived: note.isArchived,
            isPinned: note.isPinned
        });
    }

    const onOutsideClick = async () => {
        try {
            setChangeNote(!changeNote)
            if (note.note.trim() !== "" && note.title.trim() !== "") {
                let newNote = {
                    title: note.title,
                    note: note.note,
                    color: colorList[selectedColor -1].key,
                    isArchived: note.isArchived,
                    isPinned: note.isPinned
                }
                let res = await addNote(newNote);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response && error.response.data && error.response.data.message && error.response.data.message);
        }
    }

    return (
        <div className='note_container'>
            <OutsideClickHandler onOutsideClick={onOutsideClick}>
                <div className='note_wrapper'>
                    <div className='pin_note' onClick={handlePinned}><img src={note.isPinned ? Pinned : Pin} /></div>
                    <input className='title_section text_1' name="title" id="title" rows='1' placeholder='Title' value={note.title} onChange={(e) => handleInput({ key: 'title', value: e.target.value })} />
                    <textarea className='title_section note_area' rows={1} name="note" id="note" placeholder='Take a note...' autoFocus value={note.note} onChange={(e) => handleInput({ key: 'note', value: e.target.value })}></textarea>
                    <NoteAction colorList={colorList} note={note} setNote={setNote} onOutsideClick={onOutsideClick} handleInput={handleInput} handleColor={handleColor} />
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default Note;