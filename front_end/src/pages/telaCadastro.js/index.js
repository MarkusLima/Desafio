import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function TelaCadastro() {
    const [dt, setDt] = useState(null);
    const [enderecoPartida, setEnderecoPartida] = React.useState("");
    const [enderecoDestino, setEnderecoDestino] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({ lat: null, lng: null });
    const [coordinatesDest, setCoordinatesDestino] = React.useState({ lat: null, lng: null });


    const [nome, setNome] = useState('');
    const [dateEntrega, setDateEntrega] = useState('');


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

    return (

        <div className="container">
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
                                        {/* <p>Latitude: {coordinates.lat}</p><p>Longitude: {coordinates.lng}</p><p>Adress: {enderecoPartida}</p> */}
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="text" required {...getInputProps({ placeholder: "Digite local de partida..." })}/>
                                        </Form.Group>
                                        <div>
                                            {loading ? <div>Loading...</div> : null}
                                            {suggestions.map(suggestion => {return (<div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>); })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>

                            <PlacesAutocomplete value={enderecoDestino} onChange={setEnderecoDestino} onSelect={handleSelectDestino}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div> 
                                        {/* <p>Latitude: {coordinatesDest.lat}</p><p>Longitude: {coordinatesDest.lng}</p><p>Adress: {enderecoDestino}</p> */}
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="text" required {...getInputProps({ placeholder: "Digite local de Destino..." })}/>
                                        </Form.Group>
                                        <div>
                                            {loading ? <div>Loading...</div> : null}
                                            {suggestions.map(suggestion => {return (<div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>); })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                          

                            <Button variant="primary" type="button">Cadastrar</Button>
                        </Form>
                        <Card.Footer className="text-muted">{dt}</Card.Footer>
                    </Card>
                </Col>
                <Col className="col col-lg-7">
                 
                </Col>
            </Row>

        </div>
    )
}

