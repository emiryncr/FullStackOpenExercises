const Header = ({ course }) => (
  <h1>{course}</h1>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((element) => (
      <Part key={element.id} part={element.name} exercises={element.exercises} />
    ))}
  </div>
);

const Part = ({ part, exercises }) => (
  <p>{part} {exercises}</p>
);

const Total = ({ parts }) => (
  <p><strong>Number of exercises {parts.reduce((sum, current) => sum + current.exercises, 0)}</strong></p>
);
const Course = ({ courses }) => {
    console.log(courses);
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
      
    </div>
  )
}

export default Course