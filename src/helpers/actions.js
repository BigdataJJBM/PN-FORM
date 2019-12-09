import axios from 'axios';

const BASE_URL = 'http://localhost:3000';


//action for APPOINTMENTS
export function getApplicant() {
    return axios.get(`${BASE_URL}/api/applicant/list`)
        .then(response => response.data)
}

export function getApplicantDone() {
    return axios.get(`${BASE_URL}/api/applicant/getDone`)
        .then(response => response.data)
}

export function getApplicantPending() {
    return axios.get(`${BASE_URL}/api/applicant/getPending`)
        .then(response => response.data)
}

export function getApplicantFail() {
    return axios.get(`${BASE_URL}/api/applicant/getFail`)
        .then(response => response.data)
}

export function deleteApplicant(id) {
    return axios.post(`${BASE_URL}/api/applicant/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message))
}
export function getByLocation() {
    return axios.get(`${BASE_URL}/api/applicant/byLocation`)
        .then(response => response.data)
}

export function getByGender() {
    return axios.get(`${BASE_URL}/api/applicant/byGender`)
        .then(response => response.data)
}

export function createApplicant(data) {
    return axios.post(`${BASE_URL}/api/applicant/create`, {
        firstname: data.firstname,
        middlename: data.middlename,
        lastname: data.lastname,
        email: data.email,
        contact: data.contact,
        birthdate: data.birthdate,
        address: {
            province: data.address.province,
            municipality: data.address.municipality,
            barangay: data.address.barangay,
        },
        seniorhighSchoolBackground: {
            school: data.seniorhighSchoolBackground.school,
            specialization: data.seniorhighSchoolBackground.specialization,

        },
        familyBackground: {
            fatherName: data.familyBackground.fatherName,
            fatherIncome: data.familyBackground.fatherIncome,
            motherName: data.familyBackground.motherName,
            motherIncome: data.familyBackground.motherIncome,
            familySituation: data.familyBackground.familySituation,
        },
        gender: data.gender,
        age: data.age,
        note: data.note,
        status: data.status,
        action: data.action,
    })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}





export function updateApplicant(data, id) {
    return axios.post(`${BASE_URL}/api/applicant/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}





//Admin - Account
export function getAccount() {
    return axios.get(`${BASE_URL}/api/account/retrieve`)
        .then(response => response.data)
}

export function deleteAccount(id) {
    return axios.post(`${BASE_URL}/api/account/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}

export function createAccount(data) {
    return axios.post(`${BASE_URL}/api/account/create`, { username: data.username, password: data.password })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

export function updateAccount(data, id) {
    return axios.post(`${BASE_URL}/api/account/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}


export function login(data) {
    return axios.post(`${BASE_URL}/api/admin/login`, {
        username: data.username,
        password: data.password,
    })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}

export function getuser(data) {
    return axios.get(`${BASE_URL}/api/admin/get`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message));
}