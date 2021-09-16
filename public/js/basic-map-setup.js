
function initMap() {

    const map = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 8,
            center: directions.ironhackMAD.coords
        }
    )

    getStations(map)
}

function getStations(map) {

    axios
        .get('/api/stations')
        .then(response => printStations(response.data, map))
        .catch(err => console.log(err))
}

function printStations(stations, map) {

    stations.forEach(elm => {

        let position = {
            lat: Number(elm.location?.coordinates[0]),
            lng: Number(elm.location?.coordinates[1])
        }
        console.log(map, position, elm.name)
        new google.maps.Marker({ map, position, title: elm.name })
    })
}