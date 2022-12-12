const { application } = require('express');
const express = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const { validateStory } = require('../middlewares/validator');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.main);

router.get('/connections', mainController.index);

router.get('/newConnection', isLoggedIn, validateStory, mainController.newConnection);

router.get('/about', mainController.about);

router.get('/contact', mainController.contact);

module.exports = router;