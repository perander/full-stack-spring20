import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const getRndInteger = (min, max) => {
  let nextval = Math.floor(Math.random() * (max - min + 1) ) + min;
  // console.log(nextval)
  return nextval;
}

const vote = (points, i) => {
  const copy = [...points]
  copy[i] += 1
  // console.log("points: ", copy, " selected: ", i)
  return copy
}

const MostPopular = (props) => {
  let points = props.points
  let max = {val: 0, pos: 0}
  for (let i = 0; i < points.length; i++) {
    if (points[i] > max.val) {
      max.val = points[i]
      max.pos = i
    }
  }

  return <>
    <p>{anecdotes[max.pos]}</p>
    <p>has {max.val} votes</p>
  </>

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint16Array(anecdotes.length))

  return (
    <div>
      <Header name="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={() => setPoints(vote(points, selected))} text='vote'>vote</Button>
      <Button handleClick={() => setSelected(getRndInteger(0, props.anecdotes.length - 1))} text='next anecdote'>next</Button>
      <Header name="Anecdote with most votes" />
      <MostPopular anecdotes={props.anecdotes} points={points}></MostPopular>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)