const fs = require('fs')
let movies = fs.readFileSync('./db/data.json','utf8')


exports.getAllMovies = (req,res)=>{
    res.status(200).json({
       status:'success',
       count:movies.length,
       data:{
          movies:movies
       }
    })
 
 }

 exports.createMovie = (req,res)=>
    {
       const newid= movies[movies.length - 1].id + 1
       const newmovie = Object.assign({id:newid}, req.body) 
       movies.push(newmovie)
       fs.writeFile('./db/data.json' ,JSON.stringify(movies),(err)=>
       {
          if (err) {
             console.error('Error writing to file:', err);
             return res.status(500).send('Internal Server Error');
         }
    
         // Send the new movie as the response
         res.status(201).json(newmovie);
       })
       
      
    }