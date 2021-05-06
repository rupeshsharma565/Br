import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import CashfreeCheckout from './CashfreeCheckout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><CashfreeCheckout /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
