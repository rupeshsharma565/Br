import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import HowToPlay from './HowToPlay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><HowToPlay /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});





