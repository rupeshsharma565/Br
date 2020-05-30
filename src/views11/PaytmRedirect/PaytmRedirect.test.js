import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import PaytmRedirect from './PaytmRedirect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PaytmRedirect /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
