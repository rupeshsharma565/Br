import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TransactionHistory from './TransactionHistory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><TransactionHistory /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});