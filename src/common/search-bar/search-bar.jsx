import React from 'react';
import './search-bar.scss';
import Search from '../../assets/icons/search.svg';

const SearchBar = () => {
    return (
        <div className='search_area'>
            <div className='form_control'>
                <div className='icon_area'>
                    <img src={Search} />
                </div>
                <input className='form_input'
                    placeholder='Search'
                    type="text" />
            </div>
        </div>
    );
};

export default SearchBar;