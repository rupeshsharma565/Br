import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import More from './More';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><More /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


