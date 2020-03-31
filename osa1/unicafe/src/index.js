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

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let all = good + neutral + bad
  let avg = <Average good={good} bad={bad} all={all}></Average>
  let pos = <Positive good={good} all={all}></Positive>

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good ' value={good}></StatisticLine>
          <StatisticLine text='neutral ' value={neutral}></StatisticLine>
          <StatisticLine text='bad ' value={bad}></StatisticLine>
          <StatisticLine text='all ' value={all}></StatisticLine>

          <StatisticLine text='average ' value={avg}></StatisticLine>
          <StatisticLine text='positive ' value={pos}></StatisticLine>
        </tbody>
      </table>
    </div>
  )
}

const Average = (props) => {
  let good = props.good
  let bad = props.bad
  let all = props.all

  let avg = all === 0 ? 0 : (good - bad)/all

  return (
    avg
  )
}

const Positive = (props) => {
  let good = props.good
  let all = props.all

  let pos = all === 0 ? 0 : good/all * 100
  pos = parseInt(pos, 10) + " %"

  return (
    pos
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td><td>
        {props.value}
      </td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name="give feedback" />

      <Button handleClick={() => setGood(good + 1)} text='good'>good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'>neutral</Button>
      <Button handleClick={() => setBad(bad + 1)} text='bad'>bad</Button>

      <Header name="statistics"></Header>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))