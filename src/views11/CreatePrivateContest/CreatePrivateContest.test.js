import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import CreatePrivateContest from './CreatePrivateContest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><CreatePrivateContest /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

