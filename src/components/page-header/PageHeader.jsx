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
      <div className="page__header-contain">
        <h1 className="page__heading">{Title}</h1>

        {(onBackClick !== null && onBackClick !== undefined) &&
          <div className="page__header-action page__header-action--back">
            <button onClick={onBackClick} className="page__icon-button">
              {/* NOTE: Asset here doesn't match comps. Also would prefer svgs to normalize icons across app */}
              <img src="/assets/images/ic_webBack@2x.png" />
            </button>
          </div>

        }

        {(onMapClick !== null && onMapClick !== undefined) &&
          <div className="page__header-action page__header-action--map">
            <button onClick={onMapClick} className="page__icon-button">
              <img src="/assets/images/icon_map@2x.png" />
            </button>
          </div>
        }
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  Title: PropTypes.string,

  onBackClick: PropTypes.func,
  onMapClick: PropTypes.func
};

export default PageHeader;
