import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import MyProfile from './MyProfile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><MyProfile /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

