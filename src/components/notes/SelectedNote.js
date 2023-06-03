import React from 'react'
import { GrEdit } from 'react-icons/gr'
import { MdDeleteForever } from 'react-icons/md'

const SelectedNote = (props) => {
  return (
    <div>
        {(props.isAll && !props.isStar && !props.isDelete) &&  props.selectedData.map((item,index)=>{
                return (
                  <div key={item.id} className='selectednotes-container'>
                     <div className='notes-title'>
                      <h5>{item.title}</h5>
                      <div>
                      <GrEdit size="1.4em" onClick={()=>props.editNote(item)}/>
                      <MdDeleteForever className='delete-icon' size="1.4em" onClick={()=>props.deletedNote(item)}/> 
                      </div>
                     </div>
                     <p>{item.description}</p>
                  </div>
                )
              })}
    </div>
  )
}

export default SelectedNote