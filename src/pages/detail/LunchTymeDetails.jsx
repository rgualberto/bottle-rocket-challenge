import './lunchTymeDetails.scss';
import React from 'react';
import PropTypes from 'prop-types';

const LunchTymeDetails = props => {
  const {restaurant} = props;

  return (
    <div className="lunchTymeDetails">
      <div className="lunchTymeDetails__map">map here</div>

      <div className="lunchTymeDetails__map-label">
        <h2>{restaurant.name}</h2>
        <span>{restaurant.category}</span>
      </div>

      <address className="lunchTymeDetails__address">
        {restaurant.location.formattedAddress.map((addressLine, i) => (
          <div key={i}>{addressLine}</div>
        ))}
      </address>

      <div className="lunchTymeDetails__phone">
        <span>{restaurant.contact.formattedPhone}</span>
      </div>

      <div className="lunchTymeDetails__social">
        <span>@{restaurant.contact.twitter}</span>
      </div>
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
