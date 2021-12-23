import React from 'react';
import './note-view.scss';
import NoteAction from '../note-action/note-action';
import autosize from 'autosize';
import Pin from '../../assets/icons/pin.svg';
import Pinned from '../../assets/icons/pinned.svg';
import { useUser } from '../../context/userContext';

const NoteView = (props) => {

    const { user } = useUser();
    const { notz, colorList, handleColor, handleArchive, updateNotes, gridView } = props;
    console.log('wsd', gridView)
    autosize(document.querySelector('textarea'));
    const pinnedNotes = notz.filter(pinNote => pinNote.isPinned === 1);
    const otherNotes = notz.filter(otherNote => otherNote.isPinned !== 1);

    const handlePinnedNote = (notez) => {
        updateNotes({
            _id: notez._id,
            isPinned: notez.isPinned === 0 ? 1 : 0,
            isArchived: notez.isPinned === 0 ? 0 : notez.isArchived
        })
    }

    return (
        <div className={`note_view_container ${gridView ? 'grid_view' : ''}`}>
            {pinnedNotes?.length > 0 && <h2>Pinned Notes</h2>}
            {pinnedNotes?.length > 0 && pinnedNotes.map((element, index) => {
                return <div className='note_section' style={{ backgroundColor: colorList[element.color - 1].color }} key={element._id}>
                    <div className='pin_note' onClick={() => handlePinnedNote(element)}><img src={element.isPinned ? Pinned : Pin} /></div>
                    <input className='title_section title' style={{ backgroundColor: colorList[element.color - 1].color }} name="title" id="title" rows='1' placeholder='Title' value={element.title} />
                    <textarea className='title_section note' style={{ backgroundColor: colorList[element.color - 1].color }} name="note" id="note" placeholder='Take a note...' autoFocus value={element.note} ></textarea>
                    <div className='note_action'>
                        <NoteAction listView={true} colorList={colorList} note={element} handleColor={handleColor} updateNotes={updateNotes}
                            updatedArchive={(archiveNote) => {
                                updateNotes({
                                    _id: archiveNote._id,
                                    isArchived: archiveNote.isArchived === 0 ? 1 : 0,
                                    isPinned: archiveNote.isArchived === 0 ? 0 : archiveNote.isPinned
                                })
                            }}
                        />
                    </div>
                </div>
            })}
            {pinnedNotes?.length > 0 && otherNotes?.length > 0 && <h2>Other Notes</h2>}
            {otherNotes?.length > 0 && otherNotes.map((element, index) => {
                return <div className='note_section' style={{ backgroundColor: colorList[element.color - 1].color }} key={element._id}>
                    {user.screen !== 'Trash' && <div className='pin_note' onClick={() => handlePinnedNote(element)}><img src={element.isPinned ? Pinned : Pin} /></div>}
                    <input className='title_section title' style={{ backgroundColor: colorList[element.color - 1].color }} name="title" id="title" rows='1' placeholder='Title' value={element.title} />
                    <textarea className='title_section note' style={{ backgroundColor: colorList[element.color - 1].color }} name="note" id="note" placeholder='Take a note...' autoFocus value={element.note} ></textarea>
                    <div className='note_action'>
                        <NoteAction listView={true} colorList={colorList} note={element} handleColor={handleColor} updateNotes={updateNotes}
                            updatedArchive={(archiveNote) => {
                                updateNotes({
                                    _id: archiveNote._id,
                                    isArchived: archiveNote.isArchived === 0 ? 1 : 0,
                                    isPinned: archiveNote.isArchived === 0 ? 0 : archiveNote.isPinned
                                })
                            }}
                        />
                    </div>
                </div>
            })}
        </div>
    );
}

export default NoteView;