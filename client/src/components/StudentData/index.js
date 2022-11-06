import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { AiFillDelete } from 'react-icons/ai';
import axios from '../../helper/axios';
import Loading from '../../helper/Loading';
import { showAlert, showConfirm } from '../../helper/toaster';
import "./index.css"

const StudentData = (props) => {
  const [loader, setLoader] = useState(false);

  const deleteStudent = async (sid) => {
    showConfirm({ title: "Are you sure you want to Delete ?", alertType: "ConfirmationAlerts", cancletext: "Cancel", okText: "OK" }).then(async (okResponse) => {
      if (okResponse) {
        setLoader(true);
        const res = await axios.post(`/deleteStudent`, { sId: sid });
        if (res.status == 200) {
          setLoader(false);
          showAlert({
            msg_type: "success",
            msg_text: "Deleted Successfully"
          });
          props.getData()
        }
      }
    });
  }
  return (
    <>
      <Table responsive style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th>S.No</th>
            {["StudentId", "Name", "email", "phone", "BookName", "DateOfIssue", "DateOfReturn", "Action"].map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.studentInfo && props.studentInfo.length > 0 ? props.studentInfo.map((item, index) => {
            return (
              <tr key={item._id} style={item.showAlert == true ? { background: "#deb1b1" } : {}}>
                <td>{index + 1}</td>
                <td >{item.studentId}</td>
                {item.showAlert == true ? <td><span className="spnDetails">{item.Name}</span><span className="spnTooltip">
                  <strong>Date of Return expired</strong>
                </span></td> : <td>{item.Name}</td>}
                <td >{item.email}</td>
                <td >{item.phone}</td>
                <td>{item.bookName}</td>
                <td>{new Date(item.DateOfIssue).toLocaleString()}</td>
                <td>{new Date(item.DateOfReturn).toLocaleString()}</td>
                <td><AiFillDelete style={{ cursor: "pointer" }} onClick={() => deleteStudent(item.studentId)} /></td>
              </tr>
            )
          }) : <div>No Data</div>}
        </tbody>
      </Table>
      {loader ? <Loading /> : ""}
    </>
  );
}

export default StudentData;