import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import PrintTeam from './PrintTeam';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PrintTeam /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});