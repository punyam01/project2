
const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
 let movies = fs.readFileSync('./controllers/data.json','utf8')
 
app.get('/api/v1/movies', (req,res)=>{
   res.status(200).json({
      status:'success',
      count:movies.length,
      data:{
         movies:movies
      }
   })

})


app.post('/api/v1/movies', (req,res)=>
{
   const newid= movies[movies.length - 1].id + 1
   const newmovie = Object.assign({id:newid}, req.body) 
   movies.push(newmovie)
   fs.writeFile('./controllers/data.json' ,JSON.stringify(movies),(err)=>
   {
      if (err) {
         console.error('Error writing to file:', err);
         return res.status(500).send('Internal Server Error');
     }

     // Send the new movie as the response
     res.status(201).json(newmovie);
   })
   
  
})

 app.listen(8000, () =>{
    console.log('server is running');
 })

