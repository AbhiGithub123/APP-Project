import React, { useState } from "react";
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import "../Header/index.css"
import axios from "../../helper/axios";
import Loading from "../../helper/Loading";
import { showAlert } from "../../helper/toaster";

const FormLayout = (props) => {
    const [studentId, setStudentId] = useState("");
    const [Name, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [bookName, setBookName] = useState("");
    const [days, setDays] = useState(1);
    const [loader, setLoader] = useState(false);

    const submitStudentData = async (e) => {
        const payload = { studentId, Name, email, phone, bookName, days };
        e.preventDefault();
        setLoader(true);
        const res = await axios.post(`/addStudentDetails`, payload);
        if (res.status == 200) {
            setLoader(false);
            if (res.data.message == "Added") {
                setStudentId("");
                setStudentName("");
                setEmail("");
                setPhone("");
                setBookName("");
                setLoader("");
                setDays(1);
                showAlert({
                    msg_type: "success",
                    msg_text: `Student Added successfully`
                });
            }else if(res.data.message == "BookExists")
            {
                showAlert({
                    msg_type: "error",
                    msg_text: "Book Not Available"
                });
            } else {
                showAlert({
                    msg_type: "error",
                    msg_text: "Student Already Exists"
                });
            }
            props.showSidebar();
        }
    }


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className={props.sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div className='nav-menu-items'>
                        <div className='navbar-toggle'>
                            <span style={{
                                whiteSpace: "nowrap",
                                fontSize: "20px",
                                color: "white",
                                marginLeft: "30px"
                            }}>Add Student Details</span>
                            <a style={{ fontSize: "29px", marginLeft: "300px", cursor: "pointer", width: "33px", height: "51px", border: "1px solid #f6f6f6", boxSizing: "borderBox" }} onClick={props.showSidebar}>
                                <AiIcons.AiOutlineClose />
                            </a>
                        </div>
                        <form style={{ padding: "40px", overflow: "auto" }} onSubmit={submitStudentData}>
                            <div class="mb-3">
                                <label for="exampleInput1" class="form-label">Student Id</label>
                                <input class="form-control" id="exampleInput1" aria-describedby="emailHelp" placeholder="Student Id" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInput2" class="form-label">Student Name</label>
                                <input class="form-control" id="exampleInput2" aria-describedby="emailHelp" placeholder="Student Name" value={Name} onChange={(e) => setStudentName(e.target.value)} required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInput3" class="form-label">Email</label>
                                <input type="email" class="form-control" id="exampleInput3" aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInput4" class="form-label">Phone</label>
                                <input type="tel" name="phone" placeholder="012-345-6789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="form-control" id="exampleInput4" aria-describedby="emailHelp" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInput5" class="form-label">Book Name</label>
                                <input class="form-control" id="exampleInput5" aria-describedby="emailHelp" placeholder="Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInput6" class="form-label">Days</label>
                                <select class="form-control" onChange={(e) => setDays(e.target.value)} id="exampleInput6" name="days" value={days}>
                                    {[1, 2, 3, 4, 5].map(day =>
                                        <option value={day}>{day}</option>
                                    )}

                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>

                    </div>
                </nav>
            </IconContext.Provider>
            {loader ? <Loading /> : ""}
        </>

    )
}

export default FormLayout;