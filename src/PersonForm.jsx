import { useState } from "react"
import noteService from './services/notes'

const PersonForm = ({ persons, setPersons,setmessage }) => {

    const [newPesron, setNewPerson] = useState({ 'name': '', 'number': '' })
    const addNote = (event) => {
        event.preventDefault()
        const finedPerson = persons.find(x => x.name === newPesron.name)

        if (finedPerson != null) {
            if (confirm(`${newPesron.name} is already added to phonebook, update phone?`)) {
                noteService
                    .update(finedPerson.id, newPesron)
                    .then(returnedNote => {
                        setPersons(persons.map(note => note.id !== finedPerson.id ? note : returnedNote))
                        setmessage({text:`Updated ${newPesron.name}`,type:'updated'})

                    })

            }
            else {  
                                     setmessage({text:`${newPesron.name} wasn't updated`,type:'unupdated'})
        }


        }
        else {

            noteService
                .create(newPesron)
                .then(returnedPerson => {

                    console.log("🚀 ~ addNote ~ returnedPerson.data:", returnedPerson)
                    setPersons(persons.concat(returnedPerson))
                    setmessage({text:`Added ${returnedPerson.name}`,type:'added'})
                })
            setNewPerson({ 'name': '', 'number': '' })

        }
    }

    const handleNoteChange = (event) => {

        if (event.target.name === "name") setNewPerson({ 'name': event.target.value, 'number': newPesron.number })
        else {
            setNewPerson({ 'name': newPesron.name, 'number': event.target.value })
        }
    }


    return (<>
        <form onSubmit={addNote}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <label htmlFor="name">name: </label>
                    <input name='name'
                        value={newPesron.name}
                        onChange={handleNoteChange}
                    />

                </div>
                <div>
                    <label htmlFor="number">number: </label>

                    <input name="number"
                        value={newPesron.number}
                        onChange={handleNoteChange}
                    />
                </div>

            </div>
            <button type="submit" disabled={newPesron.number === '' || newPesron.name === ''}>save</button>
        </form>

    </>)
}

export default PersonForm