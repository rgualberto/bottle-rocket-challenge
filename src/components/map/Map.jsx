import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './map.scss';

const Map = props => {
  // const {} = props;
  useEffect(() => {
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
      streetViewControl: false
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }, []);

  return (
    <div className="map" id="map" />
  );
}

Map.propTypes = {};

export default Map;
