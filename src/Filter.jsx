const Filter = ({ filter, setFilter }) => {
    //console.log("🚀 ~ Filter ~ setFilter:", setFilter)
    const handleNoteChange = (event) => setFilter(event.target.value)
    return (<>

        <label htmlFor="filter">filter shown with: </label>
        <input name="filter"
            value={filter}
            onChange={handleNoteChange}
        />
    </>
    )
}


export default Filter 