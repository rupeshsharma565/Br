import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ChooseTeam from './ChooseTeam';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ChooseTeam /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});