import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './map.scss';
import classnames from 'classnames';

/***** Set Map Markers ******/
let previousInfoWindow = false;
const setMarkers = (locations, map) => {
  locations.forEach(location => {

    setTimeout(function() {
      // when using a map func on formattedAddress commas are added in wierd places.
      // opted to display individually
      const {formattedAddress} = location;
      const contentString = `
       <div>
        <h3>${location.title}</h3>
          ${formattedAddress[0] !== undefined ? formattedAddress[0] + "<br/>" : ""}
          ${formattedAddress[1] !== undefined ? formattedAddress[1] + "<br/>" : ""}
          ${formattedAddress[2] !== undefined ? formattedAddress[2] + "<br/>" : ""}
       </div>
      `;
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        animation: google.maps.Animation.DROP,
        title: location.title
      });

      marker.addListener("click", () => {
        if (previousInfoWindow) {
          previousInfoWindow.close();
        }
        previousInfoWindow = infowindow;
        infowindow.open(map, marker);
      });
    }, 200);
  });
}

const Map = props => {
  useEffect(() => {
    // init map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: props.locations.length > 1 ? 12 : 14,
      streetViewControl: false,
      center: {
        lat: props.centerLat,
        lng: props.centerLng
      }
    });

    // delay marker animation when multiple are being shown
    if (props.locations.length > 1) {
      setTimeout(() => {
        setMarkers(props.locations, map);
      }, 350);
    } else {
      setMarkers(props.locations, map);
    }
  }, []);

  const mapClassNames = classnames({
    "map": true,
    "map--large": props.locations.length > 1
  });

  return (
    <div className={mapClassNames} id="map" />
  );
}

Map.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      address: PropTypes.string,
      cc: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      crossStreet: PropTypes.string,
      formattedAddress: PropTypes.arrayOf(PropTypes.string),
      lat: PropTypes.number,
      lng: PropTypes.number,
      postalCode: PropTypes.string,
      state: PropTypes.string
    })
  ).isRequired,
  centerLat: PropTypes.number,
  centerLng: PropTypes.number
};

export default Map;
