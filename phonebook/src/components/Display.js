import React from 'react';
import ListItem from './ListItem';
import { useState, useEffect } from 'react';

const Display = ({ search, persons, deleteHandler }) => {
  const [displayContent, setDisplayContent] = useState([]);

  useEffect(() => {
    search
      ? setDisplayContent(
          persons.filter((person) =>
            person.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      : setDisplayContent([...persons]);
  }, [persons, search]);

  return displayContent.map((person, i) => (
    <ul>
      <ListItem
        onClick={() => deleteHandler(i)}
        key={person.name}
        name={person.name}
        number={person.number}
      />
    </ul>
  ));

  // return (
  //   <ul>
  //     {search
  //       ? persons
  //           .filter((person) =>
  //             person.name.toLowerCase().includes(search.toLowerCase())
  //           )
  //           .map((person, i) => (
  //             <ListItem onClick={() => deleteHandler(i)} key={person.name} name={person.name} number={person.number}/>
  //           ))
  //       : persons.map((person, i) => (
  //             <ListItem onClick={() => deleteHandler(i)} key={person.name} name={person.name} number={person.number}/>
  //         ))}
  //   </ul>
  // );
};

export default Display;
