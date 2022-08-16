const express = require('express')
const app = express()
const mongoose = require('mongoose');

const FormModel = require('./FormModel');
app.use(express.json()); // middleware
app.use(express.urlencoded({extended: true})); 

const port = 3001
const mongoURI = 'mongodb+srv://aniket:1q2w3e4r5t@cluster0.2dal9.mongodb.net/bck?retryWrites=true&w=majority';


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((res) => {
     //console.log(res);
     
    console.log('Connected to  congo database');
  })

app.get('/', (req, res) => {
    res.send('Hello World Aniket!')
  })
  app.post('/submit_form', async (req, res) => {
    console.log(req.body);
    const { password, name, phone, email,address,query } = req.body;

    if(!password || !name || !phone ||!address||!query) {
        return res.send({
            status: 400,
            message: "Missing data from 1",
            data: req.body
        })
    }

    
    

    if(password.length > 11) {
        return res.send({
            status: 400,
            message: "Invalid Grade",
            data: req.body
        })
    }
if(query.length && address.length <5){
    return res.send({
        status: 400,
        message: "Invalid query or address",
        data: red.body
    })
}
    // Write into DB
        try {
            let names =req.body.name;

            let formDs = await FormModel.findOne({name:names})
            console.log(names);
            if(formDs) {
                return res.send({
                    status: 401,
                    message: "Username already taken please use another name"
                })
            }
        }
catch(err){
    console.log(err)
   return res.send({
        status: 400,
        message: "Database  seeeee error",
        error: err
        
    })
}
let formData = new FormModel({
    name: name,
    password: password,
    phone: phone,
    query:query,
    address:address
    

})

if(email)
    formData.email = email;
    try {
    
        let formDb = await formData.save();

        console.log(formDb);

        res.send({
            status: 200,
            message: "Form Submmitted Successfully",
            pata: formDb
        });
    }
    catch(err) {
        console.log(err)
        res.send({
            status: 400,
            message: "Database error hai deho",
            error: err
        })
    }
})
app.post('/update', async(req, res) => {
    let name = req.body.name;
    let newData = req.body.newData;

    try {

        let oldData = await FormModel.findOneAndUpdate({name: name}, newData);
console.log(newData)
        res.send({
            status: 200,
            message: "Updated data successfully",
            data: oldData
        })
    }
    catch(err) {
        res.send({
            status: 400,
            message: "Database Error",
            error: err
        })
    }
  })
  
  app.listen(port, () => {
    console.log(`Example app listening  aniket at http://localhost:${port}`)
  })