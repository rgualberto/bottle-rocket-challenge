import _ from 'lodash';
import './lunchTymeDetails.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Map from '@components/map/Map.jsx';

const LunchTymeDetails = props => {
  const {restaurant} = props;
  const formattedAddress = _.get(restaurant, 'location.formattedAddress', []);
  const formattedPhone = _.get(restaurant, 'contact.formattedPhone', "");
  const twitter = _.get(restaurant, 'contact.twitter', "");

  return (
    <div className="lunchTymeDetails">
      <div className="lunchTymeDetails__map">
        <Map
          locations={[{
            title: restaurant.name,
            ...restaurant.location
          }]}
          centerLat={restaurant.location.lat}
          centerLng={restaurant.location.lng}
        />
      </div>

      <div className="lunchTymeDetails__map-label">
        <h2>{restaurant.name}</h2>
        <span>{restaurant.category}</span>
      </div>

      {formattedAddress.length > 0 &&
        <address className="lunchTymeDetails__detail lunchTymeDetails__address">
          {formattedAddress.map((addressLine, i) => (
            <div key={i}>{addressLine}</div>
          ))}
        </address>
      }

      {formattedPhone.length > 0 &&
        <div className="lunchTymeDetails__detail lunchTymeDetails__phone">
          <span>{formattedPhone}</span>
        </div>
      }

      {twitter.length > 0 &&
        <div className="lunchTymeDetails__detail lunchTymeDetails__social">
          <a href={`https://twitter.com/${twitter}`} target="_blank">@{twitter}</a>
        </div>
      }

    </div>
  );
}

LunchTymeDetails.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    backgroundImageURL: PropTypes.string,
    contact: PropTypes.shape({
      phone: PropTypes.string,
      formattedPhone: PropTypes.string,
      twitter: PropTypes.string
    }),

    location: PropTypes.shape({
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
  })
};

export default LunchTymeDetails;
