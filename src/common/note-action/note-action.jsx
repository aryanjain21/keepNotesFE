import React, { useState } from 'react';
import './note-action.scss';
import { useNote } from '../../context/noteContext';
import Paint from '../../assets/icons/paint_box.svg';
import Archive from '../../assets/icons/archive.svg';
import Trash from '../../assets/icons/trash.svg';
import Delete from '../../assets/icons/delete.svg';
import Restore from '../../assets/icons/restore.svg';
import ColorPicker from '../color-picker/color-picker';
import { useUser } from '../../context/userContext';
import { deleteNote } from '../../services/api';
import { toast } from 'react-toastify';

const NoteAction = (props) => {

    const { user } = useUser();
    const { noteDispatch } = useNote();
    const { colorList, note, setNote, selectedColor, onOutsideClick, handleInput, handleColor, updateNotes, listView, updatedArchive, setLoader } = props;
    const [showColor, setShowColor] = useState(false);

    const updateColor = (id) => {
        updateNotes({
            _id: note._id,
            color: colorList[id - 1].key
        })
    }

    const archiveHandler = (archiveNote) => {
        if (listView) {
            updatedArchive(archiveNote)
        }
    }

    const unarchiveHandler = (archiveNote) => {
        updateNotes({
            _id: archiveNote._id,
            isArchived: archiveNote.isArchived === 1 ? 0 : archiveNote.isArchived,
            isActive: archiveNote.isArchived === 0 ? 1 : archiveNote.isActive
        })
    }

    const handleDeleteNote = async (deleteId) => {
        try {
            setLoader(true);
            let res = await deleteNote({ noteId: deleteId });
            toast.success(res.data.message);
            setLoader(false);
            noteDispatch({type: 'DELETE', payload: deleteId})
        } catch (error) {
            setLoader(false);
        }
    }

    return (
        <div className='notes_option' style={selectedColor && { backgroundColor: colorList[selectedColor - 1].color }}>
            <div className={`color_picker ${showColor ? 'show_options' : ''}`} onMouseLeave={() => setShowColor(!showColor)}>
                <ColorPicker listView={listView} noteId={note._id} colorList={colorList} handleColor={handleColor} updateColor={updateColor} />
            </div>
            {user.screen !== 'Trash' ?
                <div className='icon paint_icon'><img src={Paint} onMouseOver={() => setShowColor(!showColor)} /></div>
                :
                <div className='icon paint_icon' onClick={() => handleDeleteNote(note._id)}><img src={Delete} /></div>
            }
            {user.screen == 'Notes' ?
                <div className='icon archive_icon' onClick={() => archiveHandler(note)}><img src={Archive} /></div>
                :
                <div className='icon archive_icon' onClick={() => unarchiveHandler(note)}><img src={Restore} /></div>
            }
            {user.screen !== 'Trash' && (listView ?
                <div className='icon trash_icon' onClick={() => {
                    updateNotes({
                        _id: note._id,
                        isActive: note.isActive === 1 ? 0 : 1,
                        isPinned: 0,
                        isArchived: 0
                    })
                }}><img src={Trash} /></div>
                :
                <div className='close' onClick={onOutsideClick}>Close</div>)
            }
        </div>
    );
}

export default NoteAction;