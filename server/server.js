const Blog = require('./models/blog')
const Contact = require('./models/contact');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require("body-parser");



const uri = "mongodb+srv://dont4346:Mongodb1234@blogwithbackend.vcxmz0i.mongodb.net/TalhasBlogwithMERN?retryWrites=true&w=majority"

async function connect(){
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDb");
    } catch(error){
        console.error(error);
    }
}

connect()


// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your route handler
app.post("/api/addData", (req, res) => {
    const newData = req.body; // Access the request body
    console.log(newData);

    const blogData = new Blog({
        title: newData.title,
        snippet: newData.snippet,
        body: newData.body,
        url: newData.url,
        image: newData.image
    })

    blogData.save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error)
        })
});

app.post("/api/addContact", (req,res)=>{
    const allData = req.body;
    console.log(allData);

    const contactData = new Contact({
        name: allData[0].nameInput,
        email: allData[0].emailInput,
        notes: allData[0].notesInput
    })

    contactData.save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error)
        })
});

// trying to fetch blog data

app.get("/api/getBlogData", async (req,res)=>{
    try {
    const items = await Blog.find({});
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
})

// Getting your blog on the react same page

app.get("/api/blogpage", async (req,res)=>{
    try {
        const reqbody = req.headers.referer;
        console.log(reqbody);
        const data = await Blog.findOne({url: reqbody});        
        res.json(data);
    } catch (err){
        res.status(500).send(err);
    }
})


app.listen(5000, ()=>{console.log("server started on port 5000")})