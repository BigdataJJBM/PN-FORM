const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//models
// const Service = require('./Services');
const Applicant = require('./Applicant');
const AdminAccnt = require('./AdminAccount')


//modules
const login = require('../modules/login')

//database - mongoose
mongoose.connect('mongodb://localhost:27017/PN_registration', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



// Applicant
app.get('/api/applicant/list', (req, res) => {
    Applicant.find({}).exec((err, data) => {
        if (err) return res.status(404).send('Error while getting list of applicant!');
        return res.send({ data })
    })
})
app.get('/api/applicant/byLocation',(req,res)=>{
    
    Applicant.aggregate([
            {$unwind: "$address"},
            { "$match": { "status": "Pass"} },
            {
                $group: {
                    _id: "$address.municipality",
                    count: {
                        $sum: 1
                    }
                }
            },
            { "$sort": { "_id": 1 } },
            {  "$group": {
                "_id": null,
                "counts": {
                    "$push": {
                        "k": "$_id",
                        "v": "$count"
                    }
                }
            } },
            { "$replaceRoot": {
                "newRoot": { "$arrayToObject": "$counts" }
            } }  
    
        ], function (err, result) {
            if (err) {
                next(err);
            } else {
    
                res.json(result);
            }
        });
    
})
app.get('/api/applicant/byGender',(req,res)=>{
    Applicant.aggregate([
            { "$match": { "status": "Pass" } },
            {
                $group: {
                    _id: "$gender",
                    count: {
                        $sum: 1
                    }
                }
            },
            { "$sort": { "_id": 1 } },
            {  "$group": {
                "_id": null,
                "counts": {
                    "$push": {
                        "k": "$_id",
                        "v": "$count"
                    }
                }
            } },
            { "$replaceRoot": {
                "newRoot": { "$arrayToObject": "$counts" }
            } }  
    
        ], function (err, result) {
            if (err) {
                next(err);
            } else {
    
                res.json(result);
            }
        });
    
})
app.post('/api/applicant/create', (req, res) => {
    console.log(req.body)
    const data = new Applicant({
        firstname: req.body.firstname,
        middlename:req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        contact: req.body.contact,
        reason: req.body.reason,
        note: req.body.note,
        address:{
        province:req.body.address.province,
        municipality:req.body.address.municipality,
        barangay:req.body.address.barangay,
        },
        familyIncome:req.body.familyIncome,
        gender:req.body.gender,
        age:req.body.age,
        status: req.body.status,
        action: req.body.action,
    
    });
    data.save((err) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    });
});

app.get('/api/applicant/getDone', (req, res) => {
    Applicant.find({ status: "Pass" }).exec((err, data) => {
        if (err) return res.status(404).send('Error while getting list of applicant!');
        return res.send({ data })
    })
})

app.post('/api/applicant/update/:id', (req, res) => {
    Applicant.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
    })
})

app.post('/api/applicant/delete/:id', (req, res) => {
    Applicant.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})

//Admin - Account
app.get('/api/account/retrieve', (req, res) => {
    AdminAccnt.find({}, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})

app.post('/api/account/create', (req, res) => {
    console.log(req.body)
    const data = new AdminAccnt({ username: req.body.username, password: req.body.password });
    data.save((err) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    });
});

app.post('/api/account/update/:id', (req, res) => {
    console.log(req.body)
    AdminAccnt.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })

    })
})

app.post('/api/account/delete/:id', (req, res) => {
    AdminAccnt.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})





const PORT = 3000;

app.listen(PORT)
console.log('api running on port: ' + PORT)