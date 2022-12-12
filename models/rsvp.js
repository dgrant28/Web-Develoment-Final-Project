const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    connection: { type: Schema.Types.ObjectId, ref: 'Connection' },
    response: { type: String, required: true, enum: ['YES', 'NO', 'MAYBE'] },
}
);


module.exports = mongoose.model('RSVP', rsvpSchema);