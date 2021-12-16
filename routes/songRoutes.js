const router = require('express').Router()
const { Song } = require('../models')

// GET all songs
router.get('/songs', (req,res) => Song.findAll()
  .then(songs => res.json(songs))
  .catch(err => console.log(err)))

// POST one movie
router.post('/songs', (req, res) => Song.create(req.body)
  .then(song => res.json(song))
  .catch(err => console.log(err)))

// PUT one song
router.put('/songs/:id', ({ params: { id }, body }, res) => Song.update(body, { where: { id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one song
router.delete('/songs/:id', ({ params: { id } }, res) => Song.destroy({ where: { id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router