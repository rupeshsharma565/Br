import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import FantasyPointSystem from './FantasyPointSystem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><FantasyPointSystem /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

