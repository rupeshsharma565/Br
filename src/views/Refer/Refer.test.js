import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Refer from './Refer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Refer /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

