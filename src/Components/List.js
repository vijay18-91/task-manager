import React, { useState } from 'react';
import { Add } from './Add';
import { Item } from './Item';
import './List.style.scss';

export const List = props => {

    const { lists, addItem, items, handleDragStart, handleDragOver, handleDragDrop, handleDragEnter, deleteItem, editDescription } = props;

    const [toggleAddItem, setToggleAddItem] = useState({});

    const updateToggle = name => {
        const tempToggleAddItem = {...toggleAddItem};
        tempToggleAddItem[name]= Object.prototype.hasOwnProperty.call(tempToggleAddItem, name) ? !tempToggleAddItem[name] : true;
        setToggleAddItem(tempToggleAddItem);
    }

    const addItemCallback = (event, type, name, description, lts) =>{
        if (items[lts].filter(itm => itm.name == name).length > 0) return;
        const tempToggleAddItem = {...toggleAddItem};
        tempToggleAddItem[lts]= false;
        setToggleAddItem(tempToggleAddItem);
        addItem(event, type, name, description, lts);
    }

    return (
        <div className='List'>
            {lists.map(lts => {
                return (
                    <div key={lts} id={lts} className='List__section' onDragOver={handleDragOver} onDrop={handleDragDrop}>
                    {/* <div key={lts} id={lts} className='List__section'> */}
                        <div className='List__section--name'>{lts}</div>
                        {items[lts].length > 0 && 
                        <Item 
                            items={items[lts]} 
                            list={lts} 
                            handleDragStart={handleDragStart} 
                            handleDragOver={handleDragOver} 
                            handleDragDrop={handleDragDrop} 
                            handleDragEnter={handleDragEnter}
                            deleteItem={deleteItem}
                            editDescription={editDescription} />}
                        <div className='List__button' onClick={() => updateToggle(lts)}>{toggleAddItem[lts] ? '-' : '+'}</div>
                        {toggleAddItem[lts] && <Add onChange={(event, type, name, description) => addItemCallback(event, type, name, description, lts)} type='Item' /> }
                    </div>
                )
            })}
        </div>
    )

}