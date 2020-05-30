import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Checkout from './Checkout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Checkout /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

