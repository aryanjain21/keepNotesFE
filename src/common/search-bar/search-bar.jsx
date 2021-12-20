import React, { useState } from 'react';
import './search-bar.scss';
import ColorList from '../../assets/locales/color.json';
import Search from '../../assets/icons/search.svg';
import { useNote } from '../../context/noteContext';
import { getNotes } from '../../services/api';
import BackArrow from '../../assets/icons/back_arrow.svg';

const SearchBar = (props) => {

    const { noteDispatch } = useNote();
    const { mobileSearch, setMobileSearch } = props;
    const [search, setSearch] = useState('');

    const searchNote = async (value) => {
        try {
            const res = await getNotes({search: value});
            if(res.data.status == '200') {
                res.data.data.map(note => {
                    note.color = note.color ? ColorList.find(color => color.key === note.color).id : 1
                });
                noteDispatch({type: 'ALL_NOTE', payload: res.data})
            }
        } catch (error) {
            
        }
    }

    return (
        <div className={`search_area ${mobileSearch ? 'mobile_search_area' : ''}`}>
            <div className='form_control'>
                {!mobileSearch ?
                    <div className='icon_area'>
                        <img src={Search} />
                    </div>
                    :
                    <div className='icon_area' onClick={() => setMobileSearch(!mobileSearch)}>
                        <img src={BackArrow} />
                    </div>
                }
                <input className='form_input'
                    placeholder='Search'
                    type="text"
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); searchNote(e.target.value);}} />
            </div>
        </div>
    );
};

export default SearchBar;