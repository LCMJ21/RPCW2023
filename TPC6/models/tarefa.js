const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    description: String,
    owner: String,
    date: String,
    completed: Boolean,
});

module.exports = mongoose.model('tarefa', studentSchema);