const { getPostData } = require("../utils");

const Student = require('../controllers/studentClass.js');
const BookClass = require("../controllers/bookClass");

class MainRouterClass {
    constructor(req,db) {

        this.req=req;
        this.db=db;
        this.stObj = Student.instance()
        this.bookObj = BookClass.Bookinstance();

    }
    async processRequest() {
        let valid = {};
        if (this.req.url == '/api/addStudentDetails' && this.req.method === 'POST') {
            const body = await getPostData(this.req);
            const { studentId, Name, email, phone, bookName, days } = JSON.parse(body);
            this.stObj.setStudentAttributes(studentId, Name, email, phone, bookName, days);
            let DBresponse = await this.stObj.addStudentDetails(this.db);
            return { status: DBresponse.status, message: DBresponse.message, method: "POST" };
        }
        else if (this.req.url == '/api/getStudentDetails' && this.req.method == "GET") {
            const getResponse = await this.stObj.getAllStudentDetails(this.db);
            return { status: getResponse.status, responseData: getResponse.studentInfo, method: "GET" };
        }
        else if (this.req.url == '/api/deleteStudent' && this.req.method == "POST") {
            const body = await getPostData(this.req);
            const { sId } = JSON.parse(body);
            const apiResponse = await this.stObj.deleteStudent(sId, this.db);
            return { status: apiResponse.status, message: apiResponse.message, method: "POST" };
        }
        else if (this.req.url == '/api/searchBook' && this.req.method == "POST") {
            const body = await getPostData(this.req);
            let { bookName } = JSON.parse(body);
            this.bookObj.setBookAttributes(bookName);
            const DBresponse = await this.bookObj.searchBook(this.db);
            return { status: DBresponse.status, message: DBresponse.message, method: "POST" };
        }
        else if (this.req.url == '/api/addBook' && this.req.method == "POST") {
            const body = await getPostData(this.req);
            let { bookName } = JSON.parse(body);
            this.bookObj.setBookAttributes(bookName);
            const DBresponse = await this.bookObj.addBook(this.db);
            return { status: DBresponse.status, message: DBresponse.message, method: "POST" };
        }
        valid.status = false
        return valid;
    }
}

module.exports = MainRouterClass

