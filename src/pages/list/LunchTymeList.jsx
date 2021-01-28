import './lunchTymeList.scss';
import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {setRestaurants} from './lunchTymeReducer';
import {request} from '@helpers/loader/loader';
import classnames from 'classnames';

import PageHeader from '@components/page-header/PageHeader.jsx';
import RestaurantCard from '@components/restaurant-card/RestaurantCard.jsx';
import LunchTymeDetails from '@pages/detail/LunchTymeDetails.jsx';
import Modal from '@components/modal/Modal.jsx';

const LunchTymeList = props => {
  // const {} = props;

  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.lunchTymeReducer.restaurants);

  const [error, setError] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeRestaurantIndex, setActiveRestaurantIndex] = useState(0);
  const openDetailView = (i) => {
    // set active restaurant and open
    setActiveRestaurantIndex(i)
    setDetailsOpen(true);
  };

  // fetch data
  useEffect(() => {
    request({
      url: "https://s3.amazonaws.com/br-codingexams/restaurants.json",
      postLoad: (results) => {
        if (results.restaurants === undefined) {
          // probably an error in the request. store the message.
          // adjust later if the entire error obj is needed.
          setError(results.message || "There was an error with your request. Please reload the page and try again.");
          return;
        }

        // set restaurants in store
        dispatch(setRestaurants(results.restaurants));
        setError("");
      }
    })
  }, []);

  return (
    <div className="page">
      <PageHeader
        Title="Lunch Tyme"
        onMapClick={() => {alert("Click a restaurant to see it's details!")}}
        {...detailsOpen && {
          onBackClick: setDetailsOpen.bind(null, false)
        }}
      />

      <div className="page__content-wrap">
        <div className="page__content-wrap-inner">
          <div className="page__content">
              <div className="lunchTymeList">
                {error !== "" &&
                  <div className="page__error">{error}</div>
                }

                {restaurants.length !== 0 &&
                  <ul className="lunchTymeList__restaurants">
                    {restaurants.map((r, i) => (
                      <li key={i} className="lunchTymeList__restaurant">
                        <RestaurantCard
                          Name={r.name}
                          Category={r.category}
                          ImageURL={r.backgroundImageURL}
                          onClick={openDetailView.bind(null, i)}
                        />
                      </li>
                    ))}
                  </ul>
                }
              </div>
          </div>
        </div>

        <Modal
          open={detailsOpen}
          onRequestClose={setDetailsOpen.bind(null, false)}
        >
          <LunchTymeDetails
            restaurant={restaurants[activeRestaurantIndex]}
          />
        </Modal>
      </div>
    </div>
  );
}

LunchTymeList.propTypes = {};

export default LunchTymeList;
