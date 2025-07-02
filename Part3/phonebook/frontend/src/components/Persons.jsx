

const Persons = ({persons, deletePerson}) => {
  return (
    <>
      {persons.map(person => (
          <li key={person.id}>
            {person.name} / {person.number}
            <button type="button" onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
      ))}
    </>
  )
}

export default Persons