import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./index.css";
import FormLayout from "../Form";
import StudentData from "../StudentData";
import axios from "../../helper/axios";
import { showAlert } from "../../helper/toaster";
import BookForm from "../bookForm";


const Header = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const [booksidebar, setBookSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const showBookSidebar=()=> setBookSidebar(!booksidebar);
    const [studentInfo, setStudentInfo] = useState("");
    const [bookName,setBookName]=useState("");

    const getData = async () => {
        await axios.get(`/getStudentDetails`).then((response) => {
            setStudentInfo(response.data.studentData);
        }, (error) => {
            console.log(error);
        });
    }

    const searchBook=async (e)=>{
        e.preventDefault();
        if(bookName!=""){
        await axios.post(`/searchBook`,{ bookName: bookName }).then((response)=>{
           if(response.data.message=="Found")
           {
            showAlert({
                msg_type: "success",
                msg_text: "Book Available"
            })
           }
           else{
            showAlert({
                msg_type: "error",
                msg_text: "Book Not Available"
            })
           }
        })
      }
    }

    useEffect(() => {
        getData();
    }, [sidebar]);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ padding: "20px", backgroundColor: "rgb(56 200 222) !important" }}>
                <Container>
                    <Navbar.Brand style={{ fontSize: "27px", }}>Library Management</Navbar.Brand>
                    <Nav>

                        <form style={{
                            display: "flex",
                            justifyContent: "spaceAround",
                            alignItems: "center",
                            marginRight: "24px"
                        }}
                        onSubmit={searchBook}
                        >
                            <div >
                                <input class="form-control" id="exampleInput1" aria-describedby="emailHelp" placeholder="Search" value={bookName} onChange={(e)=>setBookName(e.target.value)}/>
                            </div>
                            <button type="submit" class="btn btn-success" style={{ marginLeft: "25px" }}>search</button>
                        </form>

                        <Nav.Link onClick={showBookSidebar}>Add Book</Nav.Link>
                        <Nav.Link onClick={showSidebar}>Add Student</Nav.Link>
                    </Nav>
                    <BookForm showBookSidebar={showBookSidebar} booksidebar={booksidebar}/>
                    <FormLayout showSidebar={showSidebar} sidebar={sidebar} />
                </Container>
            </Navbar>
            <StudentData studentInfo={studentInfo} getData={getData} showSidebar={showSidebar} />

        </>
    )
}


export default Header;
