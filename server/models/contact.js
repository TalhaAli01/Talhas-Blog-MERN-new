const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    }
    }, {timestamps: true}
)

const Contact = mongoose.model("Contact Database", contactSchema);

module.exports = Contact;