import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import MyTeams from './MyTeams';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><MyTeams /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});



