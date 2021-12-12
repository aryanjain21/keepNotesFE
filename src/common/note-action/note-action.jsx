import React, { useState } from 'react';
import './note-action.scss';
import Paint from '../../assets/icons/paint_box.svg';
import Archive from '../../assets/icons/archive.svg';
import Trash from '../../assets/icons/trash.svg';
import ColorPicker from '../color-picker/color-picker';

const NoteAction = (props) => {

    const { colorList, note, setNote, selectedColor, onOutsideClick, handleInput, handleColor } = props;
    const [showColor, setShowColor] = useState(false);

    const handleArchive = () => {
        setNote({
            ...note,
            isArchived: note.isArchived === 0 ? 1 : 0
        })
    }

    return (
        <div className='notes_option' style={{backgroundColor: colorList[selectedColor -1].color}}>
            <div className={`color_picker ${showColor ? 'show_options' : ''}`} onMouseLeave={() => setShowColor(!showColor)}>
                <ColorPicker colorList={colorList} handleColor={handleColor} />
            </div>
            <div className='icon paint_icon'><img src={Paint} onMouseOver={() => setShowColor(!showColor)} /></div>
            <div className='icon archive_icon' onClick={() => handleArchive()}><img src={Archive} /></div>
            {/* <div className='icon trash_icon' onClick={() => handleInput(null)}><img src={Trash} /></div> */}
            <div className='close' onClick={onOutsideClick}>Close</div>
        </div>
    );
}

export default NoteAction;