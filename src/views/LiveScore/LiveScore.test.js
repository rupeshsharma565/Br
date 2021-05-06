import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import LiveScore from './LiveScore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><LiveScore /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
