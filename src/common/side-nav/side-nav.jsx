import React from 'react';
import './side-nav.scss';
import Notes from '../../assets/icons/notes.svg';
import Archive from '../../assets/icons/archive.svg';
import Trash from '../../assets/icons/trash.svg';

const SideNav = (props) => {

    const { showSideNav } = props;

    return (
        <div className='side_nav_container'>
            <ul className={`nav_list ${showSideNav ? 'show_list' : ''}`}>
                <li className='list notes'>
                    <div className='icon'>
                        <img src={Notes} />
                    </div>
                    {showSideNav && <span className='txt'>Note</span>}
                </li>
                <li className='list'>
                    <div className='icon'>
                        <img src={Archive} />
                    </div>
                    {showSideNav && <span className='txt'>Archive</span>}
                </li>
                <li className='list'>
                    <div className='icon'>
                        <img src={Trash} />
                    </div>
                    {showSideNav && <span className='txt'>Trash</span>}
                </li>
            </ul>
        </div>
    );
}

export default SideNav;