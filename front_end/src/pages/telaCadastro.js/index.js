import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import './index.css';

export default function TelaCadastro() {
    const [dt, setDt] = useState(null);
    const [nome, setNome] = useState(null);
    const [dateEntrega, setDateEntrega] = useState(null);
    const [enderecoPartida, setEnderecoPartida] = React.useState(null);
    const [enderecoDestino, setEnderecoDestino] = React.useState(null);
    const [coordinates, setCoordinates] = React.useState({ lat: null, lng: null });
    const [coordinatesDest, setCoordinatesDestino] = React.useState({ lat: null, lng: null });


    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setEnderecoPartida(value);
        setCoordinates(latLng);
    };

    const handleSelectDestino = async value => {
        const resultsDest = await geocodeByAddress(value);
        const latLng = await getLatLng(resultsDest[0]);
        setEnderecoDestino(value);
        setCoordinatesDestino(latLng);
    };

    useEffect(() => {
        var dt = new Date();
        var dia = dt.getDate();
        if (dia < 10) { dia = "0" + dia; }
        var mes = dt.getMonth() + 1;
        if (mes < 10) { mes = "0" + mes; }
        var hora = dt.getHours();
        if (hora < 10) { hora = "0" + hora; }
        var minuto = dt.getMinutes();
        if (minuto < 10) { minuto = "0" + minuto; }
        var ano = dt.getFullYear();
        var dataAtual = hora + ":" + minuto + " - " + dia + "/" + mes + "/" + ano;
        setDt(dataAtual);
    }, [])

    function postDatabase() {
        if(coordinates.lng != null && coordinatesDest.lng != null){
            try {
                const data = {
                    "nomeCliente": nome,
                    "dataEntrega": dateEntrega,
                    "pontoPartida": {
                        "endereco": enderecoPartida,
                        "lat": coordinates.lat,
                        "lng": coordinates.lng
                    },
                    "pontoDestino": {
                        "endereco": enderecoDestino,
                        "lat": coordinatesDest.lat,
                        "lng": coordinatesDest.lng
                    },
                    "statusEntrega": "aberto"
                };
    
                const request = new Request('https://bibliotheque-livre-85491.herokuapp.com/api', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({ 'Content-Type': 'application/json' })
                });
    
                fetch(request).then(res => res.json()).then(res => alert(res.menssagem));
    
            } catch (error) {
                alert(error);
            }
        }else{
            alert("Preencha todos os campos!")
        }
    }

    return (

        <div className="container cadastro-container">
            <br />

            <Row className="row justify-content-md-center">
                <Col className="col col-lg-5">
                    <Card className="text-center" bg="light">
                        <Card.Header>Cadastro de Entregas</Card.Header>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Digite um nome..." required value={nome} onChange={event => setNome(event.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="date" placeholder="Digite a data de entrega..." required value={dateEntrega} onChange={event => setDateEntrega(event.target.value)} />
                            </Form.Group>

                            <PlacesAutocomplete value={enderecoPartida} onChange={setEnderecoPartida} onSelect={handleSelect}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="text" required {...getInputProps({ placeholder: "Digite local de partida..." })} />
                                        </Form.Group>
                                        <div>
                                            {suggestions.map(suggestion => { return (<div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>); })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                            {coordinates.lng == null ? <span className="text-danger">Pressione ENTER</span> : <span className="text-success">OK</span>}<br />

                            <PlacesAutocomplete value={enderecoDestino} onChange={setEnderecoDestino} onSelect={handleSelectDestino}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="text" required {...getInputProps({ placeholder: "Digite local de Destino..." })} />
                                        </Form.Group>
                                        <div>
                                            {suggestions.map(suggestion => { return (<div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>); })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                            {coordinatesDest.lng == null ? <span className="text-danger">Pressione ENTER</span> : <span className="text-success">OK</span>}<br />


                            <Button variant="primary" type="button" onClick={postDatabase}>Cadastrar</Button>
                        </Form>
                        <Card.Footer className="text-muted">{dt}</Card.Footer>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

