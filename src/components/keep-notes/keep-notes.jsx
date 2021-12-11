import React, { useState } from 'react';
import './keep-notes.scss';
import ColorList from '../../assets/locales/color.json';
import Header from '../../common/header/header';
import SideNav from '../../common/side-nav/side-nav';
import NoteBar from '../../common/note-bar/note-bar';
import Note from '../../common/note/note';
import Login from '../login/login';
import SignUp from '../sign-up/sign-up';
import CustomModal from '../../custom-modal/custom-modal';

const KeepNotes = () => {

    const [note, setNote] = useState({ title: '', note: '', isArchived: 0, isPinned: 0 });
    const [selectedColor, setSelectedColor] = useState(1);
    const [showSideNav, setShowSideNav] = useState(false);
    const [changeNote, setChangeNote] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [view, setView] = useState(false);

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

    const handleColor = (id) => {
        setSelectedColor(id);
    }

    return (
        <div className='keep_notes_container'>
            <div className='header_section'>
                <Header showSideNav={showSideNav} setShowSideNav={setShowSideNav} view={view} setView={setView} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
            </div>
            <div className='nav_menu'>
                <SideNav showSideNav={showSideNav} />
            </div>
            <div className='notes_section'>
                {changeNote ? <Note colorList={ColorList} note={note} setNote={setNote} selectedColor={selectedColor} handleColor={handleColor} changeNote={changeNote} setChangeNote={setChangeNote} handlePinned={handlePinned} /> : <NoteBar setChangeNote={setChangeNote} />}
            </div>
            <CustomModal signUp={signUp} children={signUp ? <SignUp setSignUp={setSignUp} handleRequestCloseFunc={handleRequestCloseFunc} /> : <Login signUp={signUp} setSignUp={setSignUp} handleRequestCloseFunc={handleRequestCloseFunc} />} handleRequestCloseFunc={handleRequestCloseFunc} modalIsOpen={modalIsOpen} />
        </div>
    );
};

export default KeepNotes;