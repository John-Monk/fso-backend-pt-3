import { useState, useEffect } from 'react';
import Display from './components/Display';
import Form from './components/Form';
import Search from './components/Search';
import peopleService from './services/people';
// import axios from 'axios';
import './index.css';
import Alert from './components/Alert';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [alertObj, setAlertObj] = useState({show: false, style: '', message: ''});

  useEffect(() => {
    peopleService
      .getAll()
      .then(res => setPersons(res.data))
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(res => {
    //     setPersons(res.data);
    //   })
  }, [])

  const handleNewPerson = (e) => {
    e.preventDefault();

    if (!persons) {
      setPersons([
        {
          name: newName,
          number: newPhone,
        },
      ]);
    } else if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ) 
    ) {
      if(persons.some(person => person.number.toString() === newPhone.toString())){
        showAlert(true, 'error', `${newName} is already in the phonebook.`);
      } else {
        let id = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id;
        peopleService
          .update(id, {name: newName, number: newPhone})
          .then(res => setPersons(persons.map(person => person.id !== id ? person : res.data)))
          .then(showAlert(true, 'success', `${newName}'s number been updated.`))
      }
    } else {
      peopleService
        .create({name: newName, number: newPhone})
        .then(res => setPersons(persons.concat({...res.data})))
      showAlert(true, 'success', `${newName} has been added.`)
      // setPersons(
      //   persons.concat({
      //     name: newName,
      //     number: newPhone,
      //   })
      // );
    }

    setNewName('');
    setNewPhone('');
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const deleteHandler = (data) => {
    if(window.confirm(`Delete ${persons[data].name}?`)){
      peopleService
      .deleteItem(persons[data].id)
      .then(setPersons(persons.filter(person => person.id !== persons[data].id)))
      .then(showAlert(true, 'error', `${persons[data].name} has been deleted.`))
      .catch(() => {
        showAlert(true, 'error', `${persons[data].name} has already been removed from the server.`);
      })
    } else {
      return
    }
  }
  
  const showAlert = (show = false, style = '', message = '') => {
    setAlertObj({show: show, style: style, message: message})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {alertObj.show && <Alert hideAlert={showAlert} {...alertObj} />}
      <Search handleSearch={handleSearch} />
      <Form
        newName={newName}
        newPhone={newPhone}
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
        handleNewPerson={handleNewPerson}
      />
      <h2>Numbers</h2>
      <ul>
        <Display persons={persons} search={search} deleteHandler={deleteHandler}/>
      </ul>
    </div>
  );
};

export default App;
