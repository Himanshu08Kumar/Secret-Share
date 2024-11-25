const mongoose = require('mongoose')

const SecretSchema = new mongoose.Schema({
    title: {type: String, require:true},
    content: {type: String, require:true},
    createdAt:{type: Date, default: Date.now}
})

module.exports = mongoose.model('Secret', SecretSchema);
