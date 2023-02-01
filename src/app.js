const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/leroy')

const User = mongoose.model("User",new mongoose.Schema(
    {
        first_name:{
            type:String,
            minlength:2,
            maxlength:100,
            required:true
        },
        last_name:{
            type:String,
            maxlength:100,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            minlength:2,
            maxlength:100
        },
        password:{
            type:String,
            required:true,
            minlength:8,
        }
    }
));


const app = express()

app.use(bodyParser.json())

app.use('/users',async function(req,res){
    try {
        const user = await User.find()
        res.json(user)
    } catch (e) {
        console.log(e)
        res.json({msg:'There is an error'})
    }
})

app.post('/user/register',async(req,res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.json(user)
        
    } catch (e) {
        console.log(e)
        res.json({msg:'There is an error'})
    }
})

app.listen(4000)
  

// app.use('/hello1',function(req,res){
//     const user = {
//         "username":"zulu",
//         "password":"king"
//     }
//     res.json(user)
// }).listen(3000)
