import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react';
import PageHeader from './PageHeader.jsx';

test('PageHeader blank snapshot', () => {
  const component = renderer.create(
    <PageHeader
      Title="Lunch Tyme"
      onBackClick={null}
      onMapClick={null}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PageHeader contains map action icon when function provided and no back action icon when function not provided', () => {
  const {container} = render(
    <PageHeader
      Title="Lunch Tyme"
      onBackClick={null}
      onMapClick={() => undefined}
    />
  );

  expect(container.querySelector(".page__header-action--map")).not.toBeNull();

  expect(container.querySelector(".page__header-action--back")).toBeNull();
});

// test('PageHeader blank snapshot', () => {
//   const component = renderer.create(
//     <PageHeader
//       Title="Lunch Tyme"
//       onBackClick={null}
//       onMapClick={null}
//     />
//   );
//
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
