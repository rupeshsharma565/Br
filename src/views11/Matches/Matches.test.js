import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Matches from './Matches';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Matches /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

