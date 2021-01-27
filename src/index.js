import React from 'react';
import {render} from 'react-dom';
import store from './redux/store';
import {Provider} from 'react-redux';

import LunchTymeList from '@pages/list/LunchTymeList.jsx';

// Normally would go in a PageWrap component
import '@pages/page.scss';

render(
  <Provider store={store}>
    <LunchTymeList />
  </Provider>, document.getElementById('app')
);
