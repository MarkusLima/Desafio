const mongoose = require('mongoose');

const EntregasSchema = mongoose.Schema({
    dataCadastro: {type: Date, default:Date.now},
    nomeCliente: {type: String, required: true},
    dataEntrega: {type: String, required: true},
    pontoPartida:{type: String, required: true},
    pontoDestino: {type: String, required: true},
    statusEntrega: {type: String, required: false}  
});

module.exports = mongoose.model("Entregas", EntregasSchema);