const express = require('express')
const router = express.Router()
const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movie.controller')

router.route('/').get(getAllMovies).post(createMovie)

router.route('/:id').get(getMovie).patch(updateMovie).delete(deleteMovie)

module.exports = router
