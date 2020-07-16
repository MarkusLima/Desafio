import React from 'react';
import { Button } from 'react-bootstrap';
import { withScriptjs } from "react-google-maps";
import Map from './Map';

export default function App() {
  const [info] = React.useState({
    nomeCliente: localStorage.getItem("nomeCliente"),
    enderecoPartida: localStorage.getItem("enderecoPartida"),
    enderecoDestino: localStorage.getItem("enderecoDestino"),
    dataEntrega: localStorage.getItem("dataEntrega"),
    statusEntrega: localStorage.getItem("statusEntrega"),
    dataCadastro: localStorage.getItem("dataCadastro"),
    pontoPartidalat: localStorage.getItem("pontoPartidalat"),
    pontoPartidalng: localStorage.getItem("pontoPartidalng"),
    pontoDestinolat: localStorage.getItem("pontoDestinolat"),
    pontoDestinolng: localStorage.getItem("pontoDestinolng"),
  });

  const MapLoader = withScriptjs(Map);

  return (
    <div>
      <div className="bg-danger text-center">
        <div>
          Nome: <span className="text-white">{info.nomeCliente}</span><br />
            Inicio: <span className="text-white">{info.enderecoPartida}-A-</span><br />
            Destino: <span className="text-white">{info.enderecoDestino}-B-</span><br />
            Data da entregas: <span className="text-white">{info.dataEntrega}</span><br />
        </div>
        <Button type="submit" variant="success" onClick={() => window.close()}>Ok</Button>
      </div>

      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=""&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
