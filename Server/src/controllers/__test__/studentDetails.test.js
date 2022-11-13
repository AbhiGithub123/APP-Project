const request = require('supertest');

const req = request("http://localhost:2000");

describe('Add students Info', () => {
    test('Does not add if studentId already exists', async () => {
        const response = await req.post("/api/addStudentDetails").send({
            "studentId": "402247334534534544564345", "Name": "Suryatt", "email": "Av@gm.com", "phone": "123-456-3434", "bookName": "App project", "days": "2"
        }).set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Exists")
    }
    )


    test('Add If new Student', async () => {
        const response = await req.post("/api/addStudentDetails").send({
            "studentId": "434345345", "Name": "Suryatt", "email": "Av@gm.com", "phone": "123-456-3434", "bookName": "App project", "days": "2"
        }).set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Added")
    }
    )
})


describe('Get students Info', () => {
    test('If any student return date expired', async () => {
        const response = await req.get("/api/getStudentDetails").set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body.hasExpiryData).toEqual(true)
    }
    )
})

describe('Delete student Info', () => {
    test('Delete if student Exists', async () => {
        const response = await req.post("/api/deleteStudent").send({
            "sId": "4343453457"
        }).set('Accept', 'application/json')
        expect(response.status).toEqual(200)
    }
    )
})

describe('Search Book',()=>{
    test(`Test Passed if Book Found`,async()=>{
        const response = await req.post("/api/searchBook").send({
            "bookName": "App project"
        }).set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Found")
    })
})

describe('Add Book',()=>{
    test(`Test Passed if Book Added`,async()=>{
        const response = await req.post("/api/addBook").send({
            "bookName": "App projectassignment"
        }).set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual("Added")
    })
})