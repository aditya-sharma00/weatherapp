const exp = require('constants')
const express = require('express')
const app = express()
const hbs = require('hbs')
const PORT = process.env.PORT ||  8000
const path = require('path')


const staticPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
console.log(staticPath); 


app.use(express.static(staticPath))
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/weather",(req,res)=>{
    res.render("weather")
})

app.get('about/*',(req,res)=>{
    res.render("404",{
        errormsg:"This about page not exists"
    })
})


app.get('*',(req,res)=>{
    res.render("404",{
        errormsg:"This page not exists"
    })
})


app.listen(PORT,()=>{
    console.log(`Listening port --> ${PORT}` );
})