import React from 'react'

const Tabs = (props) => {
  return (
    <div>
        <h4>Notes</h4>
            <button onClick={props.allHandler}>All ({props.notesData.length})</button>
            <button onClick={props.starHandler}>Starred ({props.starData.length})</button>
            <button onClick={props.deleteHandler}>Deleted ({props.deleteData.length})</button>
    </div>
  )
}

export default Tabs