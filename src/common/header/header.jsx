import React, { useState } from 'react';
import './header.scss';
import { useUser } from '../../context/userContext';
import Logo from '../../assets/icons/keep_notes_icon.png';
import Hamburger from '../../assets/icons/hamburger.svg';
import Setting from '../../assets/icons/settings.svg';
import Refresh from '../../assets/icons/refresh.svg';
import GridView from '../../assets/icons/grid_view.svg';
import ListView from '../../assets/icons/list_view.svg';
import SearchBar from '../search-bar/search-bar';
import SearchIcon from '../../assets/icons/search.svg';
import UserProfile from '../user-profile/user-profile';

const Header = (props) => {

    const { user } = useUser();
    const { showSideNav, setShowSideNav, modalIsOpen, setIsOpen, view, setView, getAllNote } = props;
    const [mobileSearch, setMobileSearch] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div className='header_container'>
            {!mobileSearch ?
                <div className='inner_wrapper'>
                    <div className='section_one'>
                        <div className='menu_icon' data-tooltip="Main menu" onClick={() => setShowSideNav(!showSideNav)}>
                            <img src={Hamburger} />
                        </div>
                        <div className='logo'><span><img src={Logo} /></span> KN</div>
                    </div>
                    <div className='section_two'>
                        <div className='search'>
                            <SearchBar />
                        </div>
                        <div className='keep_options'>
                            <div className='mr_24 search_icon' data-tooltip="Search" onClick={() => setMobileSearch(!mobileSearch)}>
                                <img src={SearchIcon} />
                            </div>
                            <div className='mr_24 refresh_icon' data-tooltip="Refresh" onClick={getAllNote}>
                                <img src={Refresh} />
                            </div>
                            <div className='mr_24 grid_icon' data-tooltip={view ? 'List view' : 'Grid view'} onClick={() => setView(!view)}>
                                <img src={view ? ListView : GridView} />
                            </div>
                            <div className='mr_24 setting_icon' data-tooltip="Settings">
                                <img src={Setting} />
                            </div>
                        </div>
                    </div>
                    <div className='section_three'>
                        {user.token ?
                            <div className='profile_image' onMouseOver={() => setShowProfile(!showProfile)}>{user && user.firstName && user.firstName.charAt(0).toUpperCase()}{user && user.lastName && user.lastName.charAt(0).toUpperCase()}</div>
                            :
                            <div className='login' onClick={() => setIsOpen(!modalIsOpen)}>Login</div>
                        }
                    </div>
                    <div className={`profile_section ${showProfile ? 'active' : ''}`} onMouseLeave={() => setShowProfile(!showProfile)}><UserProfile /></div>
                </div>
                :
                <div className='mobile_search_section'>
                    <SearchBar mobileSearch={mobileSearch} setMobileSearch={setMobileSearch} />
                </div>
            }
        </div>
    );
};

export default Header;