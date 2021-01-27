import React from 'react';
import PropTypes from 'prop-types';
import './restaurant-card.scss';

const RestaurantCard = props => {
  const {
    Name,
    Category,
    ImageURL,
    onClick
  } = props;

  return (
    <button
      className="restaurant-card"
      onClick={onClick}
    >
      <img
        className="restaurant-card__image"
        src={ImageURL}
      />

      <div className="restaurant-card__info">
        <h2>{Name}</h2>
        <span>{Category}</span>
      </div>
    </button>
  );
}

RestaurantCard.propTypes = {
  Name: PropTypes.string.isRequired,
  Category: PropTypes.string.isRequired,
  ImageURL: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired
};

export default RestaurantCard;
