import React from 'react';
import renderer from 'react-test-renderer';
import Modal from './Modal.jsx';

test('Modal snapshot', () => {
  const component = renderer.create(
    <Modal
      open={true}
      onRequestClose={() => undefined}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
