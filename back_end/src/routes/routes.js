const express = require("express");
const router = express.Router();
const Entregas = require("../model/entregas");

//Primeira rota
router.get("", (request, response) => {
    response.json({
        menssagem: "Benvindo(a)\n",
        GetAll: {
            "End Point": "https://bibliotheque-livre-85491.herokuapp.com/api",
            "Metodo Get": "Sem Corpo na requisição"
        },
        GetOneID: {
            "End Point": "https://bibliotheque-livre-85491.herokuapp.com/api/:id",
            "Metodo Get": "No corpo da requisição precisa de um ID válido",
            "body": "{'id': 'valor da id'}"
        },
        Post: {
            "End Point": "https://bibliotheque-livre-85491.herokuapp.com/api",
            "Metodo Post": "No corpo da requisição precisa de alguns valores",
            "body": "{'nomeCliente': 'nome', 'dataEntrega': 'dateEntrega','pontoPartida': {'endereco': 'enderecoPartida', 'lat': 'coordinates.lat','lng': 'coordinates.lng'},'pontoDestino': {'endereco': 'enderecoDestino','lat': 'coordinatesDest.lat','lng': 'coordinatesDest.lng'},'statusEntrega': 'fechado'}"
        },
        Patch: {
            "End Point": "https://bibliotheque-livre-85491.herokuapp.com/api",
            "Metodo Patch": "No cabeçalho da URL precisa de ID válido e no corpo da requisição precisa de alguns valores para atualizar",
            "body": "{'nomeCliente': 'nome', 'dataEntrega': 'dateEntrega','pontoPartida': {'endereco': 'enderecoPartida', 'lat': 'coordinates.lat','lng': 'coordinates.lng'},'pontoDestino': {'endereco': 'enderecoDestino','lat': 'coordinatesDest.lat','lng': 'coordinatesDest.lng'},'statusEntrega': 'fechado'}"
        },

        Delete: {
            "End Point": "https://bibliotheque-livre-85491.herokuapp.com/api/:id",
            "Metodo Delete": "No corpo da requisição precisa de um ID válido",
            "body": "{'id': 'valor da id'}"
        }
    })
})

//Rota Get All
router.get("/api", async (request, response) => {
    await Entregas.find().exec().then(result => {
        response.status(200).json({
            menssagem: "Requisição bem sucedida!",
            result
        });
    }).catch(error => {
        response.status(500).json({
            menssagem: "Sua ação não foi aceita!",
            error
        })
    });
});

//Rota Get Id
router.get("/api/:id", async (request, response) => {
    const id = request.params.id;
    await Entregas.findById(id).exec().then(result => {
        if (result) {
            console.log(result);
            response.status(200).json(result);
        } else {
            console.log(result);
            response.status(404).json({
                menssagem: "Id invalido",
                result
            });
        }
    }).catch(error => {
        console.log(error);
        response.status(500).json({
            menssagem: "Sua ação não foi aceita!",
            error
        });
    });
});

//Rota Post
router.post("/api/", async (request, response) => {
    const entregaResult = await new Entregas({
        nomeCliente: request.body.nomeCliente,
        dataEntrega: request.body.dataEntrega,
        pontoPartida: request.body.pontoPartida,
        pontoDestino: request.body.pontoDestino,
        statusEntrega: request.body.statusEntrega
    });
    await entregaResult.save().then(result => {
        console.log(result);
        response.status(201).json({
            menssagem: "Post bem sucedido!",
            result
        });
    }).catch(error => {
        console.log(error);
        response.status(500).json({
            menssagem: "Sua ação não foi aceita!",
            error
        });
    });
});

//Rota Update
router.patch("/api/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const updateEntrega = await Entregas.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    nomeCliente: request.body.nomeCliente,
                    dataEntrega: request.body.dataEntrega,
                    pontoPartida: request.body.pontoPartida,
                    pontoDestino: request.body.pontoDestino,
                    statusEntrega: request.body.statusEntrega
                }
            }
        )
        await response.status(200).json({
            menssagem: "Update bem sucedido!",
            updateEntrega
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            menssagem: "Sua ação não foi aceita!",
            error
        });
    }
});

//Rota Delete
router.delete("/api/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const removeEntrega = await Entregas.deleteOne(
            {
                _id: id
            }
        )
        await response.status(200).json({
            menssagem: "Remoção bem sucedido!",
            removeEntrega
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            menssagem: "Sua ação não foi aceita!",
            error
        });
    }
});

module.exports = router;