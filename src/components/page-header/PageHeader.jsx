import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  const {
    Title,
    onBackClick,
    onMapClick
  } = props;

  return (
    <div className="page__header">
      <h1 className="page__heading">{Title}</h1>

      {(onBackClick !== null && onBackClick !== undefined) &&
        <div className="page__header-action page__header-action--left">
          <button onClick={onBackClick}>back</button>
        </div>
      }

      {(onMapClick !== null && onMapClick !== undefined) && 
        <div className="page__header-action page__header-action--right">
          <button onClick={onBackClick}>map</button>
        </div>
      }
    </div>
  );
}

PageHeader.propTypes = {
  Title: PropTypes.string,

  onBackClick: PropTypes.func,
  onMapClick: PropTypes.func
};

export default PageHeader;
