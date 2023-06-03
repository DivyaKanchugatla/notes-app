import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'

const StarNotes = (props) => {
  return (
    <div>
      {(!props.isAll && props.isStar && !props.isDelete) && <div className='mt-3'>
              <h4>Starred Notes</h4>
              {(props.starData.length>0)?(props.starData.map((item,index)=>{
                return (
                  <div key={item.id} className='notes-container' onClick={()=>props.selectedNote(item)}>
                     <div className='notes-title'>
                      <h5>{item.title}</h5>
                      <div>
                      <AiOutlineStar size="1.4em" onClick={()=>props.filterStarredNote(item)}/>
                      <MdDeleteForever className='delete-icon' size="1.4em" onClick={()=>props.deletedNote(item)}/> 
                      </div>
                     </div>
                     <p>{item.description}</p>
                  </div>
                )
              })):(<h1 style={{textAlign:"center",marginTop:"100px"}}>Empty</h1>)}
            </div>}
    </div>
  )
}

export default StarNotes