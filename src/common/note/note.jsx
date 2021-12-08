import React, { useEffect, useRef } from 'react';
import './note.scss';
import Paint from '../../assets/icons/paint_box.svg';
import Archive from '../../assets/icons/archive.svg';
import Trash from '../../assets/icons/trash.svg';

const Note = (props) => {
    
    const ref = useRef();
    const { changeNote, setChangeNote } = props;

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            // If the notbar is open and the clicked target is not within the notbar div, then close the bar
            if (changeNote && ref.current && !ref.current.contains(e.target)) {
                setChangeNote(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [changeNote]);

    return (
        <div className='note_container'>
            <div className='note_wrapper' ref={ref}>
                <input className='title_section text_1' name="title" id="title" rows='1' placeholder='Title' />
                <textarea className='title_section' name="note" id="note" placeholder='Take a note...' autoFocus></textarea>
                <div className='notes_option'>
                    <div className='icon paint_icon'><img src={Paint} /></div>
                    <div className='icon archive_icon'><img src={Archive} /></div>
                    <div className='icon trash_icon'><img src={Trash} /></div>
                    <div className='close' onClick={() => setChangeNote(false)}>Close</div>
                </div>
            </div>
        </div>
    );
};

export default Note;