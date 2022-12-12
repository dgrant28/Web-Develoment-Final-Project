const { resolveInclude } = require('ejs');
const model = require('../models/connection');

exports.index = (req, res) => {
    model.find()
        .then(connections => {
            var topics = [];
            connections.forEach(e => {
                if (!(topics.includes(e.topic))) {
                    topics.push(e.topic);
                }
            });
            res.render('./connection/index', { connections, topics })
        })
        .catch(err => next(err));
};

exports.main = (req, res) => {
    res.render('index')
};


exports.newConnection = (req, res) => {
    res.render('./connection/newConnection')
};

exports.about = (req, res) => {
    res.render('./connection/about')
};

exports.contact = (req, res) => {
    res.render('./connection/contact')
};