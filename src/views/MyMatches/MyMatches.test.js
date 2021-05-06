import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import MyMatches from './MyMatches';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><MyMatches /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
