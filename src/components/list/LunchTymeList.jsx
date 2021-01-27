import './bp.scss';
import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {toggleText} from './bpReducer';
import {request} from '../../helpers/loader/loader';

const LunchTymeList = props => {
  // const {} = props;

  const dispatch = useDispatch();
  const toggle = useCallback(
    () => dispatch(toggleText()),
    [dispatch]
  );
  const toggleState = useSelector(state => state.bpReducer.toggleState);
  const title = toggleState ? headingTitle : titleToggleText;

  // fetch data
  useEffect(() => {
    request({
      url: "url goes here",
      postLoad: (results) => {

        if (results.isAxiosError) { // can be an error but not this
          console.log(results.message);
        }
      }
    })
  }, []);

  return (
    <div className="lunchTymeList">
      <div className="lunchTymeList__header">
        <h1 className="lunchTymeList__heading">Lunch Tyme</h1>
      </div>
    </div>
  );
}

LunchTymeList.propTypes = {};

export default LunchTymeList;
