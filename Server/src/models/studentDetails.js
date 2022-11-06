const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, unique: true },
    Name: { type: String },
    email: { type: String },
    phone: { type: String },
    bookName: { type: String },
    DateOfIssue: { type: Date },
    DateOfReturn: { type: Date }


}, { timestamps: true })

module.exports = mongoose.model('StudentDetails', studentSchema);