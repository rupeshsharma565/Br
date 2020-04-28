import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AddCash from './AddCash';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AddCash /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});