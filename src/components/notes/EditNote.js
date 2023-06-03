import React from 'react'

const EditNote = (props) => {
  return (
    <div>
        <div className="edit-container">
             <label>
              <small>Title :</small>
              <input type="text" value={props.title} onChange={(e)=>props.setTitle(e.target.value)}/>
             </label>
             <label>
            
             <small> Descripton :</small>
              <input type="text" value={props.description} onChange={(e)=>props.setDescription(e.target.value)}/>
             </label>
             <button onClick={props.saveNote}>Save</button>
            </div>
    </div>
  )
}

export default EditNote