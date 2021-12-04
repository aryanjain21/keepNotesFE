import React, { useState } from 'react';
import './header.scss';
import Hamburger from '../../assets/icons/hamburger.svg';
import Setting from '../../assets/icons/settings.svg';
import GridView from '../../assets/icons/grid_view.svg';
import SearchBar from '../search-bar/search-bar';
import SearchIcon from '../../assets/icons/search.svg';

const Header = (props) => {

    const { showSideNav, setShowSideNav, modalIsOpen, setIsOpen } = props;
    const [mobileSearch, setMobileSearch] = useState(false);

    return (
        <div className='header_container'>
            {!mobileSearch ?
                <div className='inner_wrapper'>
                    <div className='section_one'>
                        <div className='menu_icon' onClick={() => setShowSideNav(!showSideNav)}>
                            <img src={Hamburger} />
                        </div>
                        <div className='logo'>KN</div>
                    </div>
                    <div className='section_two'>
                        <div className='search'>
                            <SearchBar />
                        </div>
                        <div className='keep_options'>
                            <div className='mr_24 search_icon' onClick={() => setMobileSearch(!mobileSearch)}>
                                <img src={SearchIcon} />
                            </div>
                            <div className='mr_24 refresh_icon'>
                                <img src={GridView} />
                            </div>
                            <div className='mr_24 grid_icon'>
                                <img src={GridView} />
                            </div>
                            <div className='mr_24 setting_icon'>
                                <img src={Setting} />
                            </div>
                        </div>
                    </div>
                    <div className='section_three'>
                        <div className='login' onClick={() => setIsOpen(!modalIsOpen)}>Login</div>
                        {false && <div className='profile_image'></div>}
                    </div>
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