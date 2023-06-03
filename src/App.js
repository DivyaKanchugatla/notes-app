import React,{useState} from 'react'
import Tabs from './components/Tabs';
import SearchInput from './components/SearchInput';
import EditNote from './components/notes/EditNote';
import SelectedNote from './components/notes/SelectedNote';
import DeleteNotes from './components/notes/DeleteNotes';
import StarNotes from './components/notes/StarNotes';
import AllNotes from './components/notes/AllNotes';

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
    setSelectedData([])
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
            <Tabs allHandler={allHandler} starHandler={starHandler} deleteHandler={deleteHandler}notesData={notesData}starData={starData}deleteData={deleteData}/>
         </div>
          <div className='col-5'>
            <SearchInput searchQuery={searchQuery} handleSearch={handleSearch}/>

            <AllNotes isAll={isAll} isDelete={isDelete} isStar={isStar}
            notesData={notesData} deleteData={deleteData} selectedNote={selectedNote} starredNote={starredNote}/>

            <StarNotes isAll={isAll} isDelete={isDelete} isStar={isStar}
            selectedNote={selectedNote}   deleteData={deleteData} filterStarredNote={filterStarredNote} starData={starData}/>

            <DeleteNotes isAll={isAll} isDelete={isDelete} isStar={isStar}
            deleteData={deleteData} starredNote={starredNote} permanentdeletedNote={permanentdeletedNote} selectedNote={selectedNote}/>
          </div>
          <div className='col-5'>
            <SelectedNote isAll={isAll} isDelete={isDelete} isStar={isStar}
            deletedNote={deletedNote} editNote={editNote} selectedData={selectedData}/>
          </div>
          </div>
         </div>
          ):(<EditNote title={title} description={description} saveNote={saveNote} setTitle={setTitle} setDescription={setDescription}/>)}
    </>
  )
}
export default App