const BookClass = require("./bookClass");

class Student {
    constructor(){
        this.bookObj=BookClass.Bookinstance();
        Student._instance = this;
    }
    static instance() {
      if(!Student._instance){
          return new Student();
      }

      return Student._instance;
    }
    async setStudentAttributes(studentId, Name, email, phone, bookName, days)
    {
        this.studentId = studentId;
        this.Name = Name;
        this.email = email;
        this.phone = phone;
        this.bookName = bookName;
        this.days = days;
    }
    async addStudentDetails(db) {
        try {
            let date = new Date;
            const isExists = await db.collection("studentDetails").find({ studentId: this.studentId }).toArray();
            if (isExists.length > 0) {
                return { status: true, message: "Exists" }
            }
            else {
                this.bookObj.setBookAttributes(this.bookName);
                let searchResponse = await this.bookObj.searchBook(db);
                if (searchResponse.message == "Found") {
                    let dataJson = { studentId: this.studentId, Name: this.Name, email: this.email, phone: this.phone, bookName: this.bookName, DateOfIssue: new Date, DateOfReturn: new Date(date.setDate(date.getDate() + parseInt(this.days))) }
                    const createdStudent = await db.collection("studentDetails").insertOne(dataJson);
                    return { status: true, message: "Added" };
                } else {
                    return { status: true, message: "BookExists" };
                }
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    

    async getAllStudentDetails(db) {
        try {
          let studentInfo = await db.collection("studentDetails").find({}).toArray();
          if (studentInfo && studentInfo.length > 0) {
            this.checkDateExpiredData(studentInfo)
          }
          return { status: true, studentInfo };
        }
        catch (error) {
          console.log(error);
        }
      }
      async checkDateExpiredData(studentInfo) {
        let toDayDate = new Date().getTime();
        studentInfo.map(async (student) => {
          if (student.DateOfReturn.getTime() < toDayDate) {
            student.showAlert = true;
          }
          else {
            student.showAlert = false;
          }
        })
      }

      async deleteStudent(sId,db) {
        try {
          const deletedDoc=await db.collection("studentDetails").findOneAndDelete({ studentId:sId });
          return deletedDoc.value!=null ? { status: true, message: "Student info removed" } :{ status: false, message: "Student invalid" }
        }
        catch (error) {
          console.log(error);
        }
      }
}

module.exports = Student;