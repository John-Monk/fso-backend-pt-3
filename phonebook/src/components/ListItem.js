import React from 'react';

const ListItem = ({name, number, onClick}) => {
    return (
        <li>
            {name} {number}
            <button onClick={onClick}>Delete</button>
        </li>
    );
}

export default ListItem;
