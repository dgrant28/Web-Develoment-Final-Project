const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const connections = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    topic: { type: String, required: [true, 'topic is required'] },
    details: { type: String, required: [true, 'details are required'], minLength: [10, 'the content should have at least 10 characters'] },
    location: { type: String, required: [true, 'location is required'] },
    date: { type: String, required: [true, 'date is required'] },
    start: { type: String, required: [true, 'start time is required'] },
    end: { type: String, required: [true, 'end time is required'] },
    host_name: { type: Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, required: [true, 'image url is required'] },
},
    { timestamps: true }
);

module.exports = mongoose.model('Connection', connections);

