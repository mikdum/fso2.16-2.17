import Persons from "./Persons"
import PersonForm from "./PersonForm"
import Filter from "./Filter"
import Message from "./Message"
import { useEffect, useState } from "react"
import noteService from './services/notes'
const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setmessageState] = useState({ text: '', type: '' })
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setPersons(initialNotes))

  }

    , [])
    const setmessage=message=>{
      setmessageState(message)
      if(message.text!=''){

        setTimeout(() => {
          setmessageState({text:''})
        }, 5000)
      }
    }


  const deleteById = personid => {
    const finedPerson = persons.find(x => x.id === personid)


    if (confirm(`Delete ${finedPerson.name}?`)) {
      noteService
        .remove(personid)
        .then(returnedNote => {
          setPersons(persons.filter(note => note.id !== personid))
          setmessage({ text: `Deleted ${finedPerson.name}`, type: 'deleted' })

        })
        .catch(error => {
          setmessage({text:
            `'${finedPerson.name}' was already removed from server`,type:'error'})
          
          
  
      })
      
    }
  }

    // var filteredPersons = []
    var filteredPersons = persons

    const [filter, setFilter] = useState('')
    if (filter.length > 0)
      filteredPersons = persons.filter(x => x.name.includes(filter))

    return (

      <div>
        <h2 >Phonebook</h2>
        <Message message={message} />
        <Filter filter={filter} setFilter={setFilter} />
        <h3>Add a new</h3>
        <PersonForm persons={persons} setPersons={setPersons} setmessage={setmessage} />
        <h3>Numbers</h3>
        {filteredPersons.map(x => <Persons key={x.name} person={x} deleteHandler={() => deleteById(x.id)} />)}
      </div>

    )
  }
  export default App