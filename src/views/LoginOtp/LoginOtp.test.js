import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginOtp from './LoginOtp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><LoginOtp /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});




