const { addStudentDetails, getAllStudentDetails, deleteStudent } = require("../controllers/studentDetails");
const { getPostData } = require("../utils");


const urlFound = async (request,db) => {
    let valid = {};
    if (request.url == '/api/addStudentDetails' && request.method === 'POST') {
        const body = await getPostData(request);
        const DBresponse = await addStudentDetails(body,db);
        return { status: DBresponse.status, message: DBresponse.message, method: "POST" };
    }
    else if (request.url == '/api/getStudentDetails' && request.method == "GET") {
        const getResponse = await getAllStudentDetails(db);
        return { status: getResponse.status, responseData: getResponse.studentInfo, method: "GET" };
    }
    else if (request.url == '/api/deleteStudent' && request.method == "POST") {
        const body = await getPostData(request);
        const apiResponse = await deleteStudent(body,db);
        return { status: apiResponse.status, message: apiResponse.message, method: "POST" };
    }
    valid.status = false
    return valid;
}

module.exports = {
    urlFound
}