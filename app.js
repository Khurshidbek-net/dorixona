const dotenv = require("dotenv").config()
const express = require("express");
const methodOverride = require("method-override");

const PORT = process.env.PORT;

const mainRouter = require("./routes");

const app = express();
app.use(express.json());



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) =>{
    res.render("home");
})

app.use("/api", mainRouter);
app.listen(PORT, () =>{
    console.log("Server running: http://45.138.158.154:"+PORT)
});