const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} part={part.partName} exercise={part.exercises} />
      ))}
    </>
  )
}

const Total = ({total}) => {
  return (
    <h1>Total number of exercises {total}</h1>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} /> 
      <Content parts={[
        { partName: part1, exercises: exercises1 },
        { partName: part2, exercises: exercises2 },
        { partName: part3, exercises: exercises3 }
      ]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}


export default App
