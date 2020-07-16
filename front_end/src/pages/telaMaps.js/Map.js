/*global google*/
import React, { Component } from "react";
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

export default class Map extends Component {
  state = {
    directions: null,
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: parseFloat(localStorage.getItem("pontoPartidalat")), lng: parseFloat(localStorage.getItem("pontoPartidalng")) };
    const destination = { lat: parseFloat(localStorage.getItem("pontoDestinolat")), lng: parseFloat(localStorage.getItem("pontoDestinolng")) };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result)
          this.setState({ directions: result });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultCenter={{ lat: -22.916724, lng: -43.208292 }} defaultZoom={11}>
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));
    
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `800px`, width: "100%" }} />}
          mapElement={<div style={{ height: `60%` }} />}
        />
      </div>
    );
  }
}