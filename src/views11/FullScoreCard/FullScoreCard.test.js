import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import FullScoreCard from './FullScoreCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><FullScoreCard /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


