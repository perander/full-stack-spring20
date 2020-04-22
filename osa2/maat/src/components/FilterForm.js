import React from 'react'


const Filter = (props) => {
    return <>
    <form>
          <div>
              {props.text} <input
                value={props.value}
                onChange={props.handleChange}>
              </input>
        </div>
    </form>
  </>
}

export default Filter