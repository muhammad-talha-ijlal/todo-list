import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import mongoose from "mongoose"

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

mongoose.connect("mongodb+srv://talhaijlal:Test123@cluster0.uhngxvr.mongodb.net/itemsDB")

var itemSchema = new mongoose.Schema({
    item : String
})

var Item = mongoose.model("Item", itemSchema)

var listItems = []

app.get("/",(req, res)=>{
    var date = new Date().toLocaleDateString("en-US", {weekday: "long"})
    listItems = Item.find((err, listItems)=>{
        res.render("index", {date : date, items : listItems})
    })    
})

app.post("/",(req, res)=>{
    Item.insertMany([{
        item : req.body.listItem
    }])
    res.redirect("/")
});

app.post("/delete",(req, res)=>{
    const id = req.body.checkbox;
    Item.findByIdAndRemove(id, (err)=>{
        console.log(err)
    })
    res.redirect("/")
})

app.listen(process.env.PORT||3000, ()=>{
    console.log("Server is listening at Port 3000")
})