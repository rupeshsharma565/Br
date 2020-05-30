import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PrivacyPolicy /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

