import React, { useState, useEffect } from 'react';
import './keep-notes.scss';
import ColorList from '../../assets/locales/color.json';
import Header from '../../common/header/header';
import SideNav from '../../common/side-nav/side-nav';
import NoteBar from '../../common/note-bar/note-bar';
import Note from '../../common/note/note';
import Login from '../login/login';
import SignUp from '../sign-up/sign-up';
import NoteView from '../../common/note-view/note-view';
import CustomModal from '../../custom-modal/custom-modal';
import { getNotes, updateNote } from '../../services/api';
import { useUser } from '../../context/userContext';
import { useNote } from '../../context/noteContext';
import { toast } from 'react-toastify';

const KeepNotes = () => {

    const [note, setNote] = useState({ title: '', note: '', color: '', isArchived: 0, isPinned: 0 });

    const [selectedColor, setSelectedColor] = useState(1);
    const [showSideNav, setShowSideNav] = useState(false);
    const [changeNote, setChangeNote] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [view, setView] = useState(false);
    const { user } = useUser();
    const { contextNote, noteDispatch } = useNote();

    const getAllNote = async () => {
        try {
            let obj = {}
            if (user.screen == 'Notes') {
                obj = {
                    section: {
                        isActive: 1,
                        isArchived: 0
                    }
                }
            } else if (user.screen == 'Archive') {
                obj = {
                    section: {
                        isActive: 1,
                        isArchived: 1
                    }
                }
            } else {
                obj = {
                    section: {
                        isActive: 0,
                        isArchived: 0
                    }
                }
            }
            let allNote = await getNotes(obj);
            allNote.data.data.map(note => {
                note.color = note.color ? ColorList.find(color => color.key === note.color).id : 1
            });
            noteDispatch({ type: 'ALL_NOTE', payload: allNote.data });
        } catch (error) {
            toast.error(error.response && error.response.data && error.response.data.message && error.response.data.message);
        }
    }

    useEffect(() => {
        getAllNote();
    }, [user.token])

    const updateNotes = async (note) => {
        try {
            note.noteId = note._id;
            const res = await updateNote(note)
            if (res.data.status == '200') {
                getAllNote();
            }
        } catch (error) {
            toast.error(error.response && error.response.data && error.response.data.message && error.response.data.message);
        }
    }

    const handleRequestCloseFunc = () => {
        setIsOpen(false);
        setSignUp(false);
    }

    const handlePinned = () => {
        setNote({
            ...note,
            isPinned: note.isPinned === 0 ? 1 : 0
        })
    }

    const handleArchive = () => {
        setNote({
            ...note,
            isArchived: note.isArchived === 0 ? 1 : 0
        })
    }

    const handleColor = (id) => {
        setSelectedColor(id);
    }

    return (
        <div className='keep_notes_container'>
            <div className='header_section'>
                <Header showSideNav={showSideNav} setShowSideNav={setShowSideNav} view={view} setView={setView} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} getAllNote={getAllNote} />
            </div>
            <div className='hero_section'>
                <div className='nav_menu'>
                    <SideNav showSideNav={showSideNav} />
                </div>
                <div className='note_area'>
                    {user.screen == 'Notes' && <div className='notes_section'>
                        {changeNote ? <Note colorList={ColorList} note={note} setNote={setNote} selectedColor={selectedColor} handleColor={handleColor} changeNote={changeNote} setChangeNote={setChangeNote} handlePinned={handlePinned} handleArchive={handleArchive} /> : <NoteBar setChangeNote={setChangeNote} />}
                    </div>}
                    <div className='notes_view'>
                        <NoteView gridView={view} notz={contextNote.notes} colorList={ColorList} handleColor={handleColor} handleArchive={handleArchive} updateNotes={updateNotes} />
                    </div>
                </div>
            </div>
            <CustomModal signUp={signUp} children={signUp ? <SignUp setSignUp={setSignUp} handleRequestCloseFunc={handleRequestCloseFunc} /> : <Login signUp={signUp} setSignUp={setSignUp} handleRequestCloseFunc={handleRequestCloseFunc} />} handleRequestCloseFunc={handleRequestCloseFunc} modalIsOpen={modalIsOpen} />
        </div>
    );
};

export default KeepNotes;