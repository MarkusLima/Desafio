import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function TelaCadastro() {
    const [dt, setDt] = useState(null);
    const [address, setAddress] = React.useState(null);
    const [coordinates, setCoordinates] = React.useState({ lat: null, lng: null });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
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

        <div className="container fluid">
            <br />
            <Card className="text-center" bg="light">
                <Card.Header>Cadastro de Entregas</Card.Header>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Digite um nome..." required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="date" placeholder="Digite a data de entrega..." required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Digite local de partida..." required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Digite o destino..." required />
                    </Form.Group>

                    <Button variant="primary" type="buttont">Cadastrar</Button>
                </Form>
                <Card.Footer className="text-muted">{dt}</Card.Footer>
            </Card>

            <PlacesAutocomplete value={address} onChange={setAddress} googleCallbackName={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lng}</p>

                        <input {...getInputProps({ placeholder: "Type address" })} />

                        <div>
                            {loading ? <div>Loading...</div> : null}

                            {suggestions.map(suggestion => {
                                const style = { backgroundColor: suggestion.active ? "#41b6e6" : "#fff" };
                                return (<div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>);
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}
