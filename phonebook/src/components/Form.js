import React from 'react';

const Form = ({newName, newPhone, handleNewName, handleNewPhone, handleNewPerson}) => {
  return (
    <form onSubmit={handleNewPerson}>
      <h2>add a new</h2>
      <div>
        name: <input onChange={handleNewName} value={newName} /> <br />
        phone: <input onChange={handleNewPhone} value={newPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
