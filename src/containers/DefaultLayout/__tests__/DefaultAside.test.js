import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import DefaultAside from './DefaultAside';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DefaultAside /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


