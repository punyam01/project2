const fs = require('fs')
let movies = JSON.parse(fs.readFileSync('./db/data.json', 'utf8'))

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: movies.length,
    data: {
      movies: movies
    }
  })
}

exports.getMovie = (req, res) => {
  //  add sign is to convert the string in to number
  const id = +req.params.id
  // finding the movie with recieved id
  let movie = movies.find(el => {
    return el.id == id
  })

  if (!movie) {
    res.status(404).json({
      status: 'FAILED',
      message:
        'NOT ABLE TO FIND MOVIE WITH ' +
        id +
        '!!! Try again !!! WITH different ID'
    })
  }
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      movie: movie
    }
  })
}

exports.createMovie = (req, res) => {
  const newid = movies[movies.length - 1].id + 1
  const newmovie = Object.assign({ id: newid }, req.body)
  movies.push(newmovie)
  fs.writeFile('./db/data.json', JSON.stringify(movies), err => {
    if (err) {
      console.error('Error writing to file:', err)
      return res.status(500).send('Internal Server Error')
    }

    // Send the new movie as the response
    res.status(201).json(newmovie)
  })
}

exports.updateMovie = (req, res) => {
  // multiplying is also a method to convert in to string
  let id = req.params.id * 1

  // finding that particular movie from the array if not found it returns undefined
  // undefinmed is a bollean false value
  let movieToUpdate = movies.find(el => {
    return el.id == id
  })

  if (!movieToUpdate) {
    res.status(404).json({
      status: 'FAILED',
      message:
        'NOT ABLE TO FIND MOVIE WITH ' +
        id +
        '!!! Try again !!! WITH different ID'
    })
  }
  let index = movies.indexOf(movieToUpdate)
  Object.assign(movieToUpdate, req.body)
  movies[index] = movieToUpdate
  fs.writeFile('./db/data.json', JSON.stringify(movies), err => {
    res.status(200).json({
      status: 'SUCCESS',
      Data: {
        movie: movieToUpdate
      }
    })
  })
}

exports.deleteMovie = (req, res) => {
  let id = +req.params.id
  let movieToDelete = movies.find(el => {
    return el.id == id
  })
  if (!movieToDelete) {
    res.status(404).json({
      status: 'FAILED',
      message:
        'NOT ABLE TO FIND MOVIE WITH ' +
        id +
        '!!! Try again !!! WITH different ID'
    })
  }
  let index = movies.indexOf(movieToDelete)
  movies.splice(index, 1)
  fs.writeFile('./db/data.json', JSON.stringify(movies), err => {
    res.status(204).json({
      status: 'SUCCESS',
      Data: {
        movie: null
      }
    })
  })
}
