import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import CreateTeams from './CreateTeams';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><CreateTeams /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});