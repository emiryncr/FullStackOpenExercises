const Header = ({course}) => {
  console.log(course);
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
      {parts.map((part) => (
        <Part key={part.name} part={part.name} exercise={part.exercises} />
      ))}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <h2>Total number of exercises {total}</h2>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} /> 
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


export default App
