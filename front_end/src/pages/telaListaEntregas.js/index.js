import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import './index.css';

export default function App() {
    const [entregas, setEntregas] = useState([]);
    const [carregar, setCarregar] = useState(true);

    useEffect(async () => {
        getEntregas();
    }, []);

    async function getEntregas() {
        const response = await fetch('https://bibliotheque-livre-85491.herokuapp.com/api/');
        const data = await response.json();
        setEntregas(data.result);
        setCarregar(false);
    }

    async function delRegister(id) {
        try {
            const request = new Request('https://bibliotheque-livre-85491.herokuapp.com/api/' + id, {
                method: 'DELETE',
                headers: new Headers({ 'Content-Type': 'application/json' })
            });

            fetch(request).then(res => res.json()).then(res => alert(res.menssagem))
                .then(() => window.location.reload());

        } catch (error) {
            alert(error);
        }
    }

    function setCordenadas(nomeCliente, enderecoPartida, enderecoDestino, dataEntrega, statusEntrega, dataCadastro,
        pontoPartidalat, pontoPartidalng, pontoDestinolat, pontoDestinolng) {
        try {
            localStorage.setItem("nomeCliente", nomeCliente);
            localStorage.setItem("enderecoPartida", enderecoPartida);
            localStorage.setItem("enderecoDestino", enderecoDestino);
            localStorage.setItem("dataEntrega", dataEntrega);
            localStorage.setItem("statusEntrega", statusEntrega);
            localStorage.setItem("dataCadastro", dataCadastro);
            localStorage.setItem("pontoPartidalat", pontoPartidalat);
            localStorage.setItem("pontoPartidalng", pontoPartidalng);
            localStorage.setItem("pontoDestinolat", pontoDestinolat);
            localStorage.setItem("pontoDestinolng", pontoDestinolng);
            window.open('/maps', '_blank');
        } catch (error) {
            alert(error);
        }
    }

    function Loading() {
        if (carregar) {
            return (
                <Container>
                    <h1 className="text-center text-center">Carregando Aguarde...</h1>
                    <Spinner animation="border" variant="primary" className="text-center" />
                </Container>
            )
        } else {
            return (
                < Container>
                    <Card bg="ligth" className="container">
                        <Card.Header as="h5">Entregas</Card.Header>
                        <Card.Body >

                            {entregas.map(entrega => {
                                return (
                                    <>
                                        <div key={entrega._id}>
                                            <Card.Title>Nome: <span className="text-primary">{entrega.nomeCliente}</span></Card.Title>
                                            <Card.Text>Inicio: <span className="text-primary">{entrega.pontoPartida.endereco}</span></Card.Text>
                                            <Card.Text>Destino: <span className="text-primary">{entrega.pontoDestino.endereco}</span></Card.Text>
                                            <Card.Text>Data da entregas: <span className="text-primary">{entrega.dataEntrega}</span></Card.Text>
                                            <Card.Text>Cadastro: <span className="text-primary">{entrega.dataCadastro}</span></Card.Text>
                                        </div>
                                        <div className="text-center">
                                            <Button type="submit" variant="danger" onClick={() => delRegister(entrega._id)}>Deletar</Button>
                                            <Button type="submit" variant="success" onClick={() =>
                                                setCordenadas(entrega.nomeCliente, entrega.pontoPartida.endereco, entrega.pontoDestino.endereco,
                                                    entrega.dataEntrega, entrega.statusEntrega, entrega.dataCadastro, entrega.pontoPartida.lat,
                                                    entrega.pontoPartida.lng, entrega.pontoDestino.lat, entrega.pontoDestino.lng)}>
                                                Ver Local
                                                </Button>
                                        </div>
                                        <hr />
                                    </>
                                );
                            })}

                        </Card.Body>
                    </Card>
                </ Container >
            )

        }
    }
    return (
        Loading()
    )
}
