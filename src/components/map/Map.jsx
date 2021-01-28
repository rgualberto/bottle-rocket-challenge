import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './map.scss';

const Map = props => {
  // const {} = props;
  useEffect(() => {
    const centerCoordinates = { lat: props.centerLat, lng: props.centerLng };
    // current centered coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: centerCoordinates,
      streetViewControl: false
    });
    const setMarkers = () => {
      props.locations.forEach(location => {
        setTimeout(function() {
          const contentString = `
           <div>
             <h3>${location.title}</h3>
             <p>some details</p>
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
            infowindow.open(map, marker);
          });
        }, 200);
      });
    }


    if (props.locations.length > 1) {
      setTimeout(() => {
        setMarkers();
      }, 350);
    } else {
      setMarkers();
    }


  }, []);

  return (
    <div className="map" id="map" />
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
  ),
  centerLat: PropTypes.number,
  centerLng: PropTypes.number
};

export default Map;
