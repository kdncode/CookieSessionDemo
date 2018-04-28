var express = require("express");
var cookieParser = require('cookie-parser')
var session = require("express-session")
var app = express();

app.set("view engine", "ejs")
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
  }))

app.get("/index", (req, res) => {
    var arrays = ["hi", "hello"];
    res.render("index", { myArray: arrays } )
})

app.get("/te(st)?hihi", (req, res) => {
    
    res.send("index" )
})

app.get("/abc*123", (req, res) => {
    
    res.send("abc" )
})

app.get("/*-:id", (req, res) => {
    
    res.send("hihihihi " + req.params.id )
})

// Set cookie
app.get("/cookie/:id", (req, res) => {
    res.cookie("myCookie", req.params.id)
    res.send("my cookie is: " + req.params.id)
})

// Use cookie
app.get("/getcookie", (req, res) =>{
    res.send("New cookie: " + req.cookies.myCookie)
})

// Delete cookie
app.get("/deletecookie", (req, res) => {
    res.clearCookie("myCookie")
    res.send("successfully deleted cookie")
})

// Set session
app.get("/session", (req, res) =>{
    req.session.mySession = "I create sessions";
    res.send("New session has created succesfully")
})

app.get("/getsession", (req, res) => {
    res.send("New session: " + req.session.mySession)
})

app.get("/deletesession", (req, res) => {
    req.session.destroy( function (err) {
        console.log(err);
    }) 
    res.send("Destroyed session")
    res.end()
})





app.listen(3000, () => {console.log("Sv is running")})