import React, { useState } from 'react';
import './keep-notes.scss';
import Header from '../../common/header/header';
import SideNav from '../../common/side-nav/side-nav';
import NoteBar from '../../common/note-bar/note-bar';
import Note from '../../common/note/note';
import Login from '../login/login';
import SignUp from '../sign-up/sign-up';
import CustomModal from '../../custom-modal/custom-modal';

const KeepNotes = () => {

    const [showSideNav, setShowSideNav] = useState(false);
    const [changeNote, setChangeNote] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [view, setView] = useState(false);

    const handleRequestCloseFunc = () => {
        setIsOpen(false);
        setSignUp(false);
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
                {changeNote ? <Note changeNote={changeNote} setChangeNote={setChangeNote} /> : <NoteBar setChangeNote={setChangeNote} />}
            </div>
            <CustomModal signUp={signUp} children={signUp ? <SignUp setSignUp={setSignUp} handleRequestCloseFunc={handleRequestCloseFunc} /> : <Login signUp={signUp} setSignUp={setSignUp} handleRequestCloseFunc={handleRequestCloseFunc} />} handleRequestCloseFunc={handleRequestCloseFunc} modalIsOpen={modalIsOpen} />
        </div>
    );
};

export default KeepNotes;