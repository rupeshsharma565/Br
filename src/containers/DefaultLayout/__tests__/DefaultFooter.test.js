import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import DefaultFooter from './DefaultFooter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DefaultFooter /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});




