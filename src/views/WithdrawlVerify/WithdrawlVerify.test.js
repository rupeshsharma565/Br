import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import WithdrawlVerify from './WithdrawlVerify';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><WithdrawlVerify /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});