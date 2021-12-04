import React from 'react';
import './search-bar.scss';
import Search from '../../assets/icons/search.svg';

const SearchBar = (props) => {

    const { mobileSearch, setMobileSearch } = props;

    return (
        <div className={`search_area ${mobileSearch ? 'mobile_search_area' : ''}`}>
            <div className='form_control'>
                {!mobileSearch ?
                    <div className='icon_area'>
                        <img src={Search} />
                    </div>
                    :
                    <div className='icon_area' onClick={() => setMobileSearch(!mobileSearch)}>
                        close
                    </div>
                }
                <input className='form_input'
                    placeholder='Search'
                    type="text" />
            </div>
        </div>
    );
};

export default SearchBar;