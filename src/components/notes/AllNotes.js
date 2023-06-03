import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'

const AllNotes = (props) => {
  return (
    <div>
         {(props.isAll && !props.isStar && !props.isDelete) && 
           <div className='mt-3'>
              <h4>All Notes</h4>
              {props.notesData.map((item,index)=>{
                return (
                  <div key={item.id} className='notes-container' onClick={()=>props.selectedNote(item)}>
                     <div className='notes-title'>
                      <h5>{item.title}</h5>
                      <div>
                      <AiOutlineStar size="1.4em" onClick={()=>props.starredNote(item)}/>
                      <MdDeleteForever className='delete-icon' size="1.4em" onClick={()=>props.deletedNote(item)}/> 
                      </div>
                     </div>
                     <p>{item.description}</p>
                  </div>
                )
              })}
            </div>}
    </div>
  )
}

export default AllNotes