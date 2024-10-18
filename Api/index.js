const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require('cookie-parser')
const app = express();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer')
const fs = require('fs')

const User = require('./models/user')
const Post = require('./models/post')

const uploadMiddleware = multer({dest:'uploads/'})


app.use(cors({credentials:true , origin:'http://localhost:5173'}));
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))

const salt = bcrypt.genSaltSync(10);
const secret = 'avadhutmalirandom'
mongoose.connect('mongodb+srv://maliavadhut7:mM2UuDVxI06rZ21v@cluster0.i9caq.mongodb.net/');


app.get("/",(req,res)=>{
    res.json("test ok")
})

app.post("/register", async(req,res)=>{
    const {username , password} = req.body;
    try{
        const userDocs = await User.create({
            username,
            password:bcrypt.hashSync(password,salt)
        })
        console.log(username,password)
        res.json(userDocs);   
    }catch(error){
        res.status(400).json(error.message);
    }
})

app.post("/login",async(req,res)=>{
    const {username , password} = req.body;
    const userDocs = await User.findOne({username })
    if(userDocs===null){
        res.status(400).json("Wrong crenditals")
    }
    else{const passOk =bcrypt.compareSync(password,userDocs.password);
    if(passOk){
        jwt.sign({username,id:userDocs._id, }, secret,(err,token)=>{
            if(err)throw err;
            res.cookie('token',token).json({
                id:userDocs._id,
                username,
            });
        })
    }else{
        res.status(400).json("Wrong crenditals")
    }}
})

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json("No token provided");
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(403).json("Token is invalid");
        }
        res.json(info);
    });
});

app.post('/post', uploadMiddleware.single('file'),async(req,res)=>{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext;

    fs.renameSync(path ,newPath)
    const token = req.cookies.token;
    jwt.verify(token, secret, {}, async(err, info) => {
        if (err) {
            return res.status(403).json("Token is invalid");
        }
        const {title,summary, content} = req.body;

        const postDocs = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author :info.id
        })
    });

    // res.json({postDocs})
})

app.put('/post',uploadMiddleware.single('file'),async (req,res)=>{
    let newPath = null;
    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        newPath = path+'.'+ext;
        fs.renameSync(path ,newPath)
    }
    const token = req.cookies.token;
    jwt.verify(token, secret, {}, async(err, info) => {
        if (err) {
            return res.status(403).json("Token is invalid");
        }
        const {id ,title,summary, content} = req.body;
        const postDoc = await Post.findById(id);

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
        if(!isAuthor){
            res.status(400).json('you are not the author')
        }
        
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover:newPath ?newPath : postDoc.cover,
        })

    });
})

app.get('/post',async(req,res)=>{
    const post = await Post.find()
        .populate('author' , ['username'])
        .sort({createdAt: -1})
        .limit(20)
    res.json(post)
})

app.get("/post/:id",async(req,res)=>{
    const {id} = req.params
    const postDocs = await Post.findById(id).populate('author' ,['username']);
    res.json(postDocs)
})


app.post('/logout',(req,res)=>{

    res.cookie('token','').json("ok")
})

app.listen(3000, ()=>{console.log("Server is starting at port 3000")})


// mongodb+srv://maliavadhut7:mM2UuDVxI06rZ21v@cluster0.i9caq.mongodb.net/
// mongodb+srv://maliavadhut7:<db_password>@cluster0.i9caq.mongodb.net/