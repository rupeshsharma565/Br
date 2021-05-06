import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import FootballFullScoreCard from './FootballFullScoreCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><FootballFullScoreCard /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


