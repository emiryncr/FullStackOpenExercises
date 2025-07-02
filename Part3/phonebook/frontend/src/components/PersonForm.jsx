
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
            name: <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>
        <br />
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
  )
}

export default PersonForm