import React from 'react'

const Course = ({course}) => {
    return <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  }
  
  const Header = (props) => {
    return (
      <>
        <h1>{props.name}</h1>
      </>
    )
  }
  
  const Content = (props) => {
    const list = props.parts.map(value => 
      <Part part={value} key={value.name}/>
    )
  
    return (
      list
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </>
    )
  }
  
  const Total = (props) => {
    const add = (acc, cur) => acc + cur.exercises
    const total = props.parts.reduce(add, 0)
  
    return (
      <>
        <p><strong>total of {total} exercises</strong></p>
      </>
    )
  }
  
  export default Course