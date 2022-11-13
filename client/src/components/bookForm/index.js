import React, { useState } from "react";
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import "../Header/index.css"
import axios from "../../helper/axios";
import Loading from "../../helper/Loading";
import { showAlert } from "../../helper/toaster";

const BookForm = (props) => {
    const [bookName, setBookName] = useState("");
    const [loader, setLoader] = useState(false);
    const submitBookData = async (e) => {
        const payload = { bookName};
        e.preventDefault();
        setLoader(true);
        const res = await axios.post(`/addBook`, payload);
        if (res.status == 200) {
            setLoader(false);
            if (res.data.message == "Added") {
                
                setBookName("");
                setLoader("");
                
                showAlert({
                    msg_type: "success",
                    msg_text: `Book Added successfully`
                });
            }else
            {
                showAlert({
                    msg_type: "error",
                    msg_text: "Book Already Exists"
                });
            } 
            props.showBookSidebar();
        }
    }


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className={props.booksidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div className='nav-menu-items'>
                        <div className='navbar-toggle'>
                            <span style={{
                                whiteSpace: "nowrap",
                                fontSize: "20px",
                                color: "white",
                                marginLeft: "30px"
                            }}>Add Book Details</span>
                            <a style={{ fontSize: "29px", marginLeft: "300px", cursor: "pointer", width: "33px", height: "51px", border: "1px solid #f6f6f6", boxSizing: "borderBox" }} onClick={props.showBookSidebar}>
                                <AiIcons.AiOutlineClose />
                            </a>
                        </div>
                        <form style={{ padding: "40px", overflow: "auto" }} onSubmit={submitBookData}>
                           
                            <div class="mb-3">
                                <label for="exampleInput5" class="form-label">Book Name</label>
                                <input class="form-control" id="exampleInput5" aria-describedby="emailHelp" placeholder="Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
                            </div>
                            <button type="submit" class="btn btn-primary">Add</button>
                        </form>

                    </div>
                </nav>
            </IconContext.Provider>
            {loader ? <Loading /> : ""}
        </>

    )
}

export default BookForm;