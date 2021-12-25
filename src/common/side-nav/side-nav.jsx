import React from 'react';
import './side-nav.scss';
import ColorList from '../../assets/locales/color.json';
import Notes from '../../assets/icons/notes.svg';
import Archive from '../../assets/icons/archive.svg';
import Trash from '../../assets/icons/trash.svg';
import { getNotes } from '../../services/api';
import { useUser } from '../../context/userContext';
import { useNote } from '../../context/noteContext';
import { toast } from 'react-toastify';

const SideNav = (props) => {

    const { user, userDispatch } = useUser();
    const { noteDispatch } = useNote();
    const { showSideNav, setLoader } = props;

    const handleClick = (screen) => {
        if (user.token) {
            userDispatch({ type: 'SCREEN_PREFERENCE', payload: { screen: screen } });
        if (screen === "Notes") {
            getAllNotes({ isActive: 1, isArchived: 0 })
        } else if (screen === "Archive") {
            getAllNotes({ isActive: 1, isArchived: 1 })
        } else {
            getAllNotes({ isActive: 0 })
        }
        localStorage.setItem('setUser', JSON.stringify({ ...user, screen: screen }));
        } else {
            toast.warn('Please login with your credential');
        }
    }

    const getAllNotes = async (obj) => {
        try {
            setLoader(true);
            let presentScreen = {
                section: {
                    isActive: obj && obj.isActive ? obj.isActive : 0,
                    isArchived: obj && obj.isArchived ? obj.isArchived : 0
                }
            }
            let res = await getNotes(presentScreen);
            setLoader(false);
            res.data.data.map(note => {
                note.color = note.color ? ColorList.find(color => color.key === note.color).id : 1
            });
            noteDispatch({ type: 'ALL_NOTE', payload: res.data });
        } catch (error) {
            setLoader(false);
        }
    }

    return (
        <div className='side_nav_container'>
            <ul className={`nav_list ${showSideNav ? 'show_list' : ''}`}>
                <li className={`list notes ${user.screen === 'Notes' ? 'active_nav' : ''} ${showSideNav && user.screen === 'Notes' && 'open_view'}`} onClick={() => { handleClick("Notes") }}>
                    <div className='icon'>
                        <img src={Notes} alt='notes' />
                    </div>
                    {showSideNav && <span className='txt'>Note</span>}
                </li>
                <li className={`list ${user.screen === 'Archive' ? 'active_nav' : ''} ${showSideNav && user.screen === 'Archive' && 'open_view'}`} onClick={() => { handleClick("Archive") }}>
                    <div className='icon'>
                        <img src={Archive} alt='archive' />
                    </div>
                    {showSideNav && <span className='txt'>Archive</span>}
                </li>
                <li className={`list ${user.screen === 'Trash' ? 'active_nav' : ''} ${showSideNav && user.screen === 'Trash' && 'open_view'}`} onClick={() => { handleClick("Trash") }}>
                    <div className='icon'>
                        <img src={Trash} alt='trash' />
                    </div>
                    {showSideNav && <span className='txt'>Trash</span>}
                </li>
            </ul>
        </div>
    );
}

export default SideNav;