import React from 'react';
import './color-picker.scss';

const ColorPicker = ({colorList, handleColor, updateColor, listView}) => {

    const updateNoteColor = (id) => {
        listView ? updateColor(id) : handleColor(id);
    }
    return(
        colorList.map((element, index) => {
            return <div className='color_section' key={element.id}>
                <div className='color' data-tooltip={element.label} onClick={() => updateNoteColor(element.id)} style={{backgroundColor: element.color}} />
            </div>
        })
    );
}

export default ColorPicker;