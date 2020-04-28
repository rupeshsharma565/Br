import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import FantasyScoreCard from './FantasyScoreCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><FantasyScoreCard /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});




