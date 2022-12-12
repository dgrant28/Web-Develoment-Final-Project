const { application } = require('express');
const express = require('express');
const connectionController = require('../controllers/connectionController');
const router = express.Router();
const { isLoggedIn, isAuthor, isNotAuthor } = require('../middlewares/auth');
const { validateId, validateStory, validateResult } = require('../middlewares/validator');

router.post('/', isLoggedIn, validateStory, validateResult, connectionController.create);

router.get('/:id', validateId, connectionController.connection);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, connectionController.edit);

router.put('/:id', validateId, isLoggedIn, isAuthor, validateStory, validateResult, connectionController.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, validateResult, connectionController.delete);

router.post('/:id/rsvp', validateId, isLoggedIn, isNotAuthor, validateResult, connectionController.rsvp);

module.exports = router;