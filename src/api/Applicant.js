const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = Schema(
    {
        firstname: { type: String, required: true },
        middlename: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        contact: { type: Number, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        birthdate: { type: String, required: true },
        address: {
            province: { type: String, required: true },
            municipality: { type: String, required: true },
            barangay: { type: String, required: true },
        },
        seniorhighSchoolBackground: {
            school: { type: String, required: true },
            specialization: { type: String, required: true },
        },
        familyBackground: {
            fatherName: { type: String, required: true },
            fatherIncome: { type: Number, required: true },
            motherName: { type: String, required: true },
            motherIncome: { type: Number, required: true },
            familySituation: { type: String, required: true },
        },
        batch : {type : Number, required : true},
        note: { type: String, required: true },
        status: { type: String, required: true },
        action: { type: String, required: true },
    },
);

const Applicant = mongoose.model("Applicant", ApplicantSchema);

module.exports = Applicant;