import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import CashfreeResponse from './CashfreeResponse';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><CashfreeResponse /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


