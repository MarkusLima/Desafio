import React from 'react'
const Main = () => {
    // initializes state
    let [latitude, setLatitude] = React.useState(-33.7560119)
    let [longitude, setLongitude] = React.useState(150.6038367)
    let [address, setAddress] = React.useState('')
    // searches for new locations
    const updateCoordinates = (e) => {
        e.preventDefault()
        const encodedAddress = encodeURI(address)
        // fetches data from our api
        fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${encodedAddress}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                "x-rapidapi-key": process.env.RAPIDAPI_KEY
            }
        })
            .then(response => response.json())
            .then(response => {
                setLatitude(response.lat)
                setLongitude(response.long)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <p>The latitude is {latitude}</p>
            <p>The longitude is {longitude}</p>
            <form onSubmit={(e) => updateCoordinates(e)}>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        required
                        aria-describedby="addressHelp"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button className="btn mb-4 btn-primary" type='submit'>Search Location</button>
            </form>
        </div>
    )
}
export default Main