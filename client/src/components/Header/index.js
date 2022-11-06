import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./index.css";
import FormLayout from "../Form";
import StudentData from "../StudentData";
import axios from "../../helper/axios";


const Header = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [studentInfo, setStudentInfo] = useState("");

    const getData = async () => {
        await axios.get(`/getStudentDetails`).then((response) => {
            setStudentInfo(response.data.studentData);
        }, (error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getData();
    }, [sidebar]);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ padding: "20px", backgroundColor: "rgb(56 200 222) !important" }}>
                <Container>
                    <Navbar.Brand style={{ fontSize: "27px", marginLeft: "500px" }}>Library Management</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={showSidebar}>Add Student</Nav.Link>
                    </Nav>
                    <FormLayout showSidebar={showSidebar} sidebar={sidebar} />
                </Container>
            </Navbar>
            <StudentData studentInfo={studentInfo} getData={getData} showSidebar={showSidebar} />

        </>
    )
}


export default Header;
