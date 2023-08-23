import React, { useState } from 'react';
import './Add.style.scss';

export const Add = props => {

    const { onChange, type } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className='Add'>
            <div className='Add__section'>
                <input  className='Add__section--input' id='name' type='text' name='name' onChange={(event) => setName(event.target.value)} value={name} autoComplete='off' placeholder='name' autoFocus />
            </div>
            <div className='Add__section'>
                <input className='Add__section--input' id='description' type='text' name='description' onChange={(event) => setDescription(event.target.value)} value={description} autoComplete='off' placeholder='description' />
            </div>
            <button className='Add__button' type='button' onClick={(event) => onChange(event, type, name, description)} disabled={name.length == 0}>Add</button>
        </div>
    )

}