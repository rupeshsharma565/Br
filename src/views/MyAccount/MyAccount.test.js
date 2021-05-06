import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import MyAccount from './MyAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><MyAccount /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});



