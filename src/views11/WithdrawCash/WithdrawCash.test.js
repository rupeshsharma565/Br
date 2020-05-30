import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import WithdrawCash from './WithdrawCash';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><WithdrawCash /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


