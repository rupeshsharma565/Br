import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import PaytmCheckout from './PaytmCheckout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PaytmCheckout /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
