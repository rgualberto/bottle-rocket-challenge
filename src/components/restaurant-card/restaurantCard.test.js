import React from 'react';
import renderer from 'react-test-renderer';
import RestaurantCard from './RestaurantCard.jsx';

test('RestaurantCard snapshot', () => {
  const component = renderer.create(
    <RestaurantCard
      Name="Test Restaurant"
      Category="Tasty"
      ImageURL=""
      onClick={() => undefined}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
