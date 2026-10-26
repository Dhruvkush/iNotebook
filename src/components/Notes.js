import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote"
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate()
  
    useEffect(() => {
        if (localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
        
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note,setNote] = useState({id:"",etitle:"",edescription:"", etag:""})


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag })
      
    }

      const handleClick = (e) =>{
        refClose.current.click()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Updated successfully", "success");
    }

    const onChange= (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <> 
            <AddNote showAlert={props.showAlert}/>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div style={{fontFamily:'urbanist'}} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <form className="container my-3">
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle"  aria-describedby="emailhelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                       
 
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                            <button disabled={note.etitle.length<1 && note.edescription.length<1} type="button" className="btn btn-primary" onClick={handleClick}>update note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" container my-3">
                <h3 style={{fontFamily:'urbanist'}}>Your Notes</h3>
                <div className="row">
                    {notes.length===0 && 'No notes to display'}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
                </div>
            </div>
        
        </>
    )
}

export default Notes

