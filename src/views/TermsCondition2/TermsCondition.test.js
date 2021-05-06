import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TermsCondition2 from './TermsCondition2';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><TermsCondition2 /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


