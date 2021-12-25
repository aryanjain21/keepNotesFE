import React, { useState } from 'react';
import './note-modal.scss';
import ColorList from '../../assets/locales/color.json';
import Pin from '../../assets/icons/pin.svg';
import Pinned from '../../assets/icons/pinned.svg';
import { getNotes, updateNote } from '../../services/api';
import { toast } from 'react-toastify';
import { useUser } from '../../context/userContext';
import { useNote } from '../../context/noteContext';
import { Modal } from 'react-responsive-modal';
import NoteAction from '../note-action/note-action';
import TextareaAutosize from 'react-textarea-autosize';

const NoteModal = (props) => {

    const { user } = useUser();
    const { noteDispatch } = useNote();
    const { updateNotz, colorId, updateNotess, setUpdateNotes } = props;

    const [selectedColor, setSelectedColor] = useState(colorId);
    const [note, setNote] = useState({
        _id: updateNotz._id,
        title: updateNotz.title,
        note: updateNotz.note,
        isArchived: updateNotz.isArchived,
        isPinned: updateNotz.isPinned
    });

    const updateInput = (inputType) => {
        setNote({
            _id: note._id,
            title: inputType.key === 'title' ? inputType.value : note.title,
            note: inputType.key === 'note' ? inputType.value : note.note,
            isArchived: note.isArchived,
            isPinned: note.isPinned
        });
    }

    const updateColor = (id) => {
        setSelectedColor(id)
    }

    const updatePinned = () => {
        setNote({
            ...note,
            isPinned: note.isPinned === 1 ? 0 : 1,
            isArchived: note.isPinned === 0 ? 0 : note.isArchived
        });
    }

    const updateArchive = (modalNotz) => {
        setNote({
            ...note,
            isArchived: modalNotz.isArchived === 1 ? 0 : 1,
            isPinned: modalNotz.isArchived === 0 ? 0 : modalNotz.isPinned
        });
    }

    const getAllNote = async () => {
        try {
            let obj = {}
            if (user.screen === 'Notes') {
                obj = {
                    section: {
                        isActive: 1,
                        isArchived: 0
                    }
                }
            } else if (user.screen === 'Archive') {
                obj = {
                    section: {
                        isActive: 1,
                        isArchived: 1
                    }
                }
            }
            let res = await getNotes(obj);
            let resArray = res.data.data;
            for(let i = 0; i< resArray.length; i++) {
                resArray[i].color = resArray[i].color ? ColorList.find(color => color.key === resArray[i].color).id : 1
            }
            noteDispatch({ type: 'ALL_NOTE', payload: res.data })
        } catch (error) {
            toast.error('Something went wrong! Try Again.')
        }
    }

    const updateNotes = async (note) => {
        try {
            note.noteId = note._id
            const res = await updateNote(note)
            if (res.data.status === 200) {
                getAllNote();
                setUpdateNotes(false);
                toast.success(res.data.message);
            }
        } catch (error) {
            setUpdateNotes(false);
            toast.error(error?.response?.data?.message);
        }
    }

    const onOutsideClick = () => {
        if (note.note.trim() !== "" && note.title.trim() !== "") {
            let newNote = {
                _id: note._id,
                title: note.title,
                note: note.note,
                color: ColorList[selectedColor - 1].key,
                isArchived: note.isArchived,
                isPinned: note.isPinned
            }
            updateNotes(newNote);
        }
    }

    return (
        <Modal open={updateNotess}
            onClose={onOutsideClick}
            center
            classNames={{
                modal: 'update_note_modal',
                overlayAnimationIn: 'customEnterOverlayAnimation',
                overlayAnimationOut: 'customLeaveOverlayAnimation',
                modalAnimationIn: 'customEnterModalAnimation',
                modalAnimationOut: 'customLeaveModalAnimation',
            }}
            animationDuration={800}>
            <div className='update_note'>
                <div className='note_wrapper' style={{ backgroundColor: ColorList[selectedColor - 1].color }}>
                    <div className='pin_note' onClick={updatePinned}><img src={note.isPinned ? Pinned : Pin} alt='pin' /></div>
                    <input style={{ backgroundColor: ColorList[selectedColor - 1].color }} className='title_section text_1' name="title" id="title" rows='1' placeholder='Title' value={note.title} onChange={(e) => updateInput({ key: 'title', value: e?.target?.value })} />
                    <TextareaAutosize style={{ backgroundColor: ColorList[selectedColor - 1].color }} className='title_section note_area' name="note" id="note" placeholder='Take a note...' autoFocus value={note.note} onChange={(e) => updateInput({ key: 'note', value: e?.target?.value })}></TextareaAutosize>
                    <NoteAction listView={true} colorList={ColorList} note={updateNotz} selectedColor={selectedColor} onOutsideClick={onOutsideClick} updateNotes={updateNotes} updateColor={updateColor} updatedArchive={updateArchive} updateNotess={updateNotess} />
                </div>
            </div>
        </Modal>
    );
};

export default NoteModal;