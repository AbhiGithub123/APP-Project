async function addStudentDetails(body,db) {
  try {
    let date = new Date;
    const { studentId, Name, email, phone, bookName, days } = JSON.parse(body);
    const isExists = await db.collection("studentDetails").find({ studentId: studentId }).toArray();
    if (isExists.length > 0) {
      return { status: true, message: "Exists" }
    }
    else {
      let dataJson={studentId, Name, email, phone, bookName, DateOfIssue: new Date, DateOfReturn: new Date(date.setDate(date.getDate() + parseInt(days))) }
      const createdStudent=await db.collection("studentDetails").insertOne(dataJson);
      return { status: true, message: "Added" };
    }
   
  }
  catch (error) {
    console.log(error);
  }
}

async function getAllStudentDetails(db) {
  try {
    let studentInfo = await db.collection("studentDetails").find({}).toArray();
    if (studentInfo && studentInfo.length > 0) {
      checkDateExpiredData(studentInfo)
    }
    return { status: true, studentInfo };
  }
  catch (error) {
    console.log(error);
  }
}

async function deleteStudent(body,db) {
  try {
    const { sId } = JSON.parse(body);
    const deletedDoc=await db.collection("studentDetails").findOneAndDelete({ studentId: sId });
    return deletedDoc.value!=null ? { status: true, message: "Student info removed" } :{ status: false, message: "Student invalid" }
  }
  catch (error) {
    console.log(error);
  }
}

async function checkDateExpiredData(studentInfo) {
  let toDayDate = new Date().getTime();
  studentInfo.map(async (student) => {
    if (student.DateOfReturn.getTime() > toDayDate) {
      student.showAlert = true;
    }
    else {
      student.showAlert = false;
    }
  })
}


module.exports = {
  addStudentDetails,
  getAllStudentDetails,
  deleteStudent
}