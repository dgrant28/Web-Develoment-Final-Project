const { resolveInclude } = require('ejs');
const model = require('../models/connection');
const rsvpModel = require('../models/rsvp');
const connectionRoutes = require('../routes/connectionRoutes');

exports.create = (req, res, next) => {
    let connection = new model(req.body);
    connection.host_name = req.session.user;
    connection.save()
        .then(connection => {
            req.flash('success', 'connection has been created successfully');
            res.redirect('/connections');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/back');
            }
            next(err);
        });

};

exports.rsvp = async (req, res, next) => {
    let user = req.session.user.id;
    let connection = req.params.id;
    let response = req.body.rsvp;

    let rsvp = { user: user, connection: connection, response: response };

    rsvpModel.findOneAndUpdate({ connection: connection, user: user }, rsvp, { new: true, upsert: true, useFindAndModify: false, runValidators: true, rawResult: true })
        .then(result => {
            if (result.lastErrorObject.updatedExisting) {
                req.flash('Your rsvp has been updated');
            } else {
                req.flash('Your rsvp has been created');
                res.redirect('/users/profile');
            }

        })

        .catch(err => next(err));

}

exports.connection = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('host_name', 'firstName lastName')
        .then(connection => {
            if (connection) {
                return res.render('./connection/connection', { connection });
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(connection => {
            return res.render('./connection/edit', { connection });
        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, connection, { useFindAndModify: false, runValidators: true })
        .then(connection => {
            return res.redirect('/connections/' + id);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/back');
            }
            next(err);
        });
};


exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(connection => {
            res.redirect('/connections');
        })
        .catch(err => next(err));
};