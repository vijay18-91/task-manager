import React, { useState } from 'react';
import { Add } from '../Components/Add';
import { List } from '../Components/List';
import './TaskManager.style.scss';

export const TaskManager = props => {

    const [listsName, setListsName] = useState([]);
    const [items, setItems] = useState({});
    const [toggleAddListForm, setToggleAddListForm] = useState(false);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState('');

    const toggleAddList = () => {
        setToggleAddListForm(!toggleAddListForm);
        setError('');
    }

    const addList = (event, type, name, description) => {
        console.log('event, type, name, description', event, type, name, description);
        if (listsName.includes(name)) {
            setError('Name already present');
            return;
        }

        const tempListsName = [...listsName], tempItems = {...items};
        tempListsName.push(name)
        tempItems[name] = [];
        setToggleAddListForm(false);
        setListsName(tempListsName);
        setItems(tempItems);
    }

    const addItem = (event, type, name, description, lts) => {

        const tempItems = {...items};
        const currentItems = Object.prototype.hasOwnProperty.call(tempItems, lts) ? tempItems[lts] : []
        tempItems[lts] = [
            ...currentItems,
            {
                name, description
            }
        ]
        setItems(tempItems);
    }

    // Item rearrange
    const handleDragStart = event => {
        const { id } = event.target;
        const listItemPair = id.split('[]');
        event.dataTransfer.setData('list', listItemPair[0]);
        event.dataTransfer.setData('item', listItemPair[1]);
    }

    const handleDragOver = event => event.preventDefault();
    const handleDragEnter = event => {
        const { id } = event.target;
        setDragOver(id);
    }

    const handleDragDrop = event => {
        event.stopPropagation();
        let id = '';
        if (event.target.id !== '') {
            id = event.target.id;
        } else {
            id = event.currentTarget.id;
        }
        // const { id } = event.currentTarget;
        if (id === null) return;
        const isDropListEmpty = !id.includes('[]');

        const draggedListObj = event.dataTransfer.getData('list');
        const draggedItemObj = event.dataTransfer.getData('item');

        const tempItems = {...items};
        const draggedItem = tempItems[draggedListObj].filter(itm => itm.name === draggedItemObj);

        const draggedItemIndex = tempItems[draggedListObj].findIndex(itm => itm.name === draggedItemObj);
        tempItems[draggedListObj].splice(draggedItemIndex, 1);


        const dropList = id.split('[]')[0];
        const dropItem = id.split('[]')[1];

        if (!isDropListEmpty) {
            const dropItemIndex = tempItems[dropList].findIndex(itm => itm.name === dropItem);
            tempItems[dropList].splice(dropItemIndex, 0, draggedItem[0]);
        } else {
            tempItems[dropList].push(draggedItem[0]);
        }

        setItems(tempItems);
    }

    const deleteItem = (list, name) => {
        const tempItems = {...items};
        const deleteItemIndex = tempItems[list].findIndex(itm => itm.name === name);
        tempItems[list].splice(deleteItemIndex, 1);
        setItems(tempItems);
    }

    const editDescription = (event, list, name, description) => {
        const tempItems = {...items};
        tempItems[list].map(lst => {
            if (lst.name === name) {
                lst.description = event.target.value;
            }
            return lst
        })
        console.log('tempItems', tempItems)
        setItems(tempItems);
    }

    return (
        <div className='TaskManager'>
            {error}
            <div className='TaskManager__button' onClick={(event) => toggleAddList(event)}>{toggleAddListForm ? '-' : '+'}</div>
            {toggleAddListForm && <Add onChange={addList} type='List' /> }
            {listsName.length > 0 && 
            <List 
                lists={listsName} 
                items={items} 
                addItem={addItem}  
                handleDragStart={handleDragStart} 
                handleDragOver={handleDragOver} 
                handleDragDrop={handleDragDrop} 
                handleDragEnter={handleDragEnter}
                deleteItem={deleteItem}
                editDescription={editDescription} />}
        </div>
    )

}