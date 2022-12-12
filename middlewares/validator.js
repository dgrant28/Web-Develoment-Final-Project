
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateStory = [body('name', 'cannot be empty').notEmpty().trim().escape(),
body('topic', 'cannot be empty').notEmpty().trim().escape(),
body('details', 'must be atleast 10 characters and at most 100 characters').isLength({ min: 10, max: 100 }).notEmpty().trim().escape(),
body('image', 'cannot be empty').notEmpty().trim().escape(),
];

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 })];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 })];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}