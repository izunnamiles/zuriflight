const express = require('express');
const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.findAll)
router.get('/flight/:id', controller.findOne)
router.post('/flight', controller.create)
router.patch('/flight/:id', controller.update)
router.delete('/flight/:id', controller.delete)

module.exports = router;

