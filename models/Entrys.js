const mongoose = require('mongoose');
const entrySchema = new mongoose.Schema({
    laptop: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', required: true },
    entrytime: { type: Date, default: Date.now },
    checkout: { type: Date, default: null }, // null cuando aún no ha salido
    type: { type: Number, default: 1 } // 1: PRÉSTAMO BIBLIOTECA, 2: INGRESO PORTERÍA
});
module.exports = mongoose.model('Entry', entrySchema);