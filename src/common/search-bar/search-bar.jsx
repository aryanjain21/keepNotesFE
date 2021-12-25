import React, { useCallback, useState } from 'react';
import './search-bar.scss';
import ColorList from '../../assets/locales/color.json';
import Search from '../../assets/icons/search.svg';
import { useUser } from '../../context/userContext';
import { useNote } from '../../context/noteContext';
import { getNotes } from '../../services/api';
import BackArrow from '../../assets/icons/back_arrow.svg';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const SearchBar = (props) => {

    const { user } = useUser();
    const { noteDispatch } = useNote();
    const { mobileSearch, setMobileSearch, setLoader } = props;
    const [search, setSearch] = useState('');

    const searchNote = async (value) => {
        try {
            let searchObj = {
                section: {},
                search: ''
            };
            if (user.screen === 'Notes') {
                searchObj.section.isActive = 1
                searchObj.section.isArchived = 0
            } else if (user.screen === 'Archive') {
                searchObj.section.isActive = 1
                searchObj.section.isArchived = 1
            } else {
                searchObj.section.isActive = 0
            }
            searchObj.search = value
            setLoader(true);
            const res = await getNotes(searchObj);
            if (res.data.status === 200) {
                setLoader(false);
                res.data.data.map(note => {
                    note.color = note.color ? ColorList.find(color => color.key === note.color).id : 1
                });
                noteDispatch({ type: 'ALL_NOTE', payload: res.data })
            }
        } catch (error) {
            setLoader(false);
            toast.warn('Something went wrong...')
        }
    }

    const debouncedSave = useCallback(
        debounce((value) => searchNote(value), 500),
        []
    );

    const handleOnChange = e => {
        setSearch(e?.target?.value);
        if (user.token) {
            debouncedSave(e?.target?.value);
        } else {
            toast.warn('Please login with your credential');
        }
    }

    return (
        <div className={`search_area ${mobileSearch ? 'mobile_search_area' : ''}`}>
            <div className='form_control'>
                {!mobileSearch ?
                    <div className='icon_area'>
                        <img src={Search} alt='search' />
                    </div>
                    :
                    <div className='icon_area' onClick={() => setMobileSearch(!mobileSearch)}>
                        <img src={BackArrow} alt='back' />
                    </div>
                }
                <input className='form_input'
                    placeholder='Search'
                    type="text"
                    value={search}
                    onChange={handleOnChange} />
            </div>
        </div>
    );
};

export default SearchBar;