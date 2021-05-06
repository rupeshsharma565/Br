import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Verifyotp from './Verifyotp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Verifyotp /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

