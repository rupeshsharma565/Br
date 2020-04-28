import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TermsCondition from './TermsCondition';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><TermsCondition /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


