import React, { useState } from 'react';
import './Item.style.scss';

export const Item = props => {

    const { items, list, handleDragStart, handleDragOver, handleDragDrop, handleDragEnter, deleteItem, editDescription } = props;
    const [enableEdit, setEnableEdit] = useState(null)

    const toggleDescription = (event, list, name, description) => {
        switch (event.detail) {
            case 1:
                setEnableEdit(null)
                return;
            case 2:
                setEnableEdit(`${list}-${name}`);
                return;
            default:
                setEnableEdit(null)
                return;
        }
    }

    return (
        <div className='Item'>
            {items.length > 0 && items.map(itm => {
                const {name, description} = itm;
                return (
                    <div 
                        className='Item__sections' 
                        key={name}
                        id={`${list}[]${name}`}
                        draggable={true}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDragDrop}
                        onDragEnter={handleDragEnter}>
                        <div>
                            <div className='Item__sections--name'>{name}</div>
                            <label  className='Item__sections--delete' onClick={() => deleteItem(list, name)}>x</label>
                        </div>
                        {
                            enableEdit === (`${list}-${name}`) ?
                            <input 
                                className='Add__section--input' 
                                type='text' 
                                name='description' 
                                onChange={(event) => editDescription(event, list, name, description)}
                                onBlur={() => setEnableEdit(null)}
                                value={description} 
                                autoComplete='off' 
                                placeholder='description'
                                autoFocus /> : 
                            <div  className='Item__sections--description' onClick={(event) => toggleDescription(event, list, name, description)} >{description}</div>}
                    </div>
                )
            })}
        </div>
    )

}