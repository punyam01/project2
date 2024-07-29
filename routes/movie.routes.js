const express = require('express')
const router= express.Router()
const {getAllMovies,createMovie}= require('../controllers/movie.controller')

router.route('/')
   .get(getAllMovies)
   .post(createMovie);

module.exports = router;