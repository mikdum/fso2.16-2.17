


const Persons=({person,deleteHandler})=>{
    return (<li><>{person.name} {person.number}</>
    <button onClick={deleteHandler}>delete</button>
    </li>)
}

export default Persons