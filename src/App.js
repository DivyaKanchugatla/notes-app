import React,{useState} from 'react'
import {MdDeleteForever} from "react-icons/md";
import {AiOutlineStar} from "react-icons/ai"
import {GrEdit} from "react-icons/gr"

const App = () => {
  const dummyData = [
    {
      title:"personel note",
      description:"i am going to temple at 6 a.m",
      id: 1
    },
    {
      title:"medical note",
      description:"i am going to temple at 6 a.m",
      id: 2
    },
    {
      title:"financial note",
      description:"i am going to temple at 6 a.m",
      id: 3
    }
  ]

  const [notesData,setNotesData ]=useState(dummyData)
  const [selectedData,setSelectedData]=useState([])
  const [starData,setStarData]=useState([])
  const [deleteData,setDeleteData]=useState([])

  const [isAll,setIsAll]=useState(true)
  const [isStar,setIsStar]=useState(null)
  const [isDelete,setIsDelete]=useState(null)
  const [isEdit,setIsEdit]=useState(null)
 
 
  const [title,setTitle] =useState("")
  const [description,setDescription]=useState("")


  const selectedNote = (item) => {
    setSelectedData([item])
  }
  const starredNote = (item) => {
    setStarData([...starData,item])
  }
  const filterStarredNote = (item) => {
    const updateStar = starData.filter((each)=>each.id !== item.id)
    setStarData(updateStar)
  }
  const deletedNote = (item) => {
    setDeleteData([...deleteData,item])
  }
  const allHandler = () => {
    setIsAll(true)
    setIsStar(false)
    setIsDelete(false)
  }
  const starHandler = () => {
    setIsAll(false)
    setIsStar(true)
    setIsDelete(false)
    setSelectedData([])
  }
  const deleteHandler = () => {
    setIsAll(false)
    setIsStar(false)
    setIsDelete(true)
    setSelectedData([])
  }
  const permanentdeletedNote = (item) => {
    const updateAll = notesData.filter((each)=> each.id !== item.id)
    setNotesData(updateAll)
    const updateStar = starData.filter((each)=>each.id !== item.id)
    setStarData(updateStar)
    const updateDelete = deleteData.filter((each)=>each.id !== item.id)
    setDeleteData(updateDelete)
  }

  const editNote = (item) => {
    setIsEdit(true);
    setTitle(item.title);
    setDescription(item.description);
  };

  const saveNote = () => {
    const updatedNotesData = notesData.map((note) => {
      if (note.id === selectedData[0].id) {
        return {
          ...note,
          title: title,
          description: description,
        };
      }
      return note;
    });
    setNotesData(updatedNotesData);
    setIsEdit(false);
    setSelectedData([]);
    setTitle('');
    setDescription('');
  };

  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);
  const filteredNotes = notesData.filter((note) => note.title.toLowerCase().includes(query));
  setNotesData(filteredNotes)
};


  return (
    <>
    {!isEdit ? (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-2 mt-5'>
            <h4>Notes</h4>
            <button onClick={allHandler}>All ({notesData.length})</button>
            <button onClick={starHandler}>Starred ({starData.length})</button>
            <button onClick={deleteHandler}>Deleted ({deleteData.length})</button>
          </div>
          
            <div className='col-5'>
            <div className="search-container mt-2">
               <input type="text" placeholder="Search by title" value={searchQuery} onChange={handleSearch} />
            </div>
           {(isAll && !isStar && !isDelete) && 
           <div className='mt-3'>
              <h4>All Notes</h4>
              {notesData.map((item,index)=>{
                return (
                  <div key={item.id} className='notes-container' onClick={()=>selectedNote(item)}>
                     <div className='notes-title'>
                      <h5>{item.title}</h5>
                      <div>
                      <AiOutlineStar size="1.4em" onClick={()=>starredNote(item)}/>
                      <MdDeleteForever className='delete-icon' size="1.4em" onClick={()=>deletedNote(item)}/> 
                      </div>
                     </div>
                     <p>{item.description}</p>
                  </div>
                )
              })}
            </div>}
            {(!isAll && isStar && !isDelete) && <div className='mt-3'>
              <h4>Starred Notes</h4>
              {(starData.length>0)?(starData.map((item,index)=>{
                return (
                  <div key={item.id} className='notes-container' onClick={()=>selectedNote(item)}>
                     <div className='notes-title'>
                      <h5>{item.title}</h5>
                      <div>
                      <AiOutlineStar size="1.4em" onClick={()=>filterStarredNote(item)}/>
                      <MdDeleteForever className='delete-icon' size="1.4em" onClick={()=>deletedNote(item)}/> 
                      </div>
                     </div>
                     <p>{item.description}</p>
                  </div>
                )
              })):(<h1 style={{textAlign:"center",marginTop:"100px"}}>Empty</h1>)}
            </div>}
            {(!isAll && !isStar && isDelete) && <div className='mt-3'>
              <h4>Deleted Notes</h4>
              {(deleteData.length>0)?(deleteData.map((item,index)=>{
                return (
                  <div key={item.id} className='notes-container' onClick={()=>selectedNote(item)}>
                     <div className='notes-title'>
                      <h5>{item.title}</h5>
                      <div>
                      <AiOutlineStar size="1.4em" onClick={()=>starredNote(item)}/>
                      <MdDeleteForever className='delete-icon' size="1.4em" onClick={()=>permanentdeletedNote(item)}/> 
                      </div>
                     </div>
                     <p>{item.description}</p>
                  </div>
                )
              })):(<h1 style={{textAlign:"center",marginTop:"100px"}}>Empty</h1>)}
            </div>}
          </div>
          <div className='col-5'>
         {(isAll && !isStar && !isDelete) &&  selectedData.map((item,index)=>{
                return (
                  <div key={item.id} className='selectednotes-container'>
                     <div className='notes-title'>
                      <h5>{item.title}</h5>
                      <div>
                      <GrEdit size="1.4em" onClick={()=>editNote(item)}/>
                      <MdDeleteForever className='delete-icon' size="1.4em" onClick={()=>deletedNote(item)}/> 
                      </div>
                     </div>
                     <p>{item.description}</p>
                  </div>
                )
              })}
          </div>
          </div>
      </div>
          ):(<div className="edit-container">
             <label>
              <small>Title :</small>
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
             </label>
             <label>
            
             <small> Descripton :</small>
              <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
             </label>
             <button onClick={saveNote}>Save</button>
            </div>)}
          

    </>
  )
}

export default App