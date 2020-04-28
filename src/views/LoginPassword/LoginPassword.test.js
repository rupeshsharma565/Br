import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginPassword from './LoginPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><LoginPassword /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});





