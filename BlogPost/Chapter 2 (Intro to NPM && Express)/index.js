"use strict";

const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('public'))


//Routing
app.get('/', (req,res) =>{ 
    res.sendFile(path.resolve(__dirname,'index.html'))

    // res.json({
    // name: 'Greg Lim'
    // })
   })


   app.get('/about',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'about.html'))
    // res.json({
    // name: 'Greg Lim'
    // })
   })


   app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'contact.html'))

   })


   app.get('notfound', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'notfound.html'))
   })

   app.listen(3000,()=>{
    console.log("App listening on port 3000")
})