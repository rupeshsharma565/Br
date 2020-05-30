import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ChoosePrivateTeam from './ChoosePrivateTeam';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ChoosePrivateTeam /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});