import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import CashfreeRedirect from './CashfreeRedirect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><CashfreeRedirect /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

