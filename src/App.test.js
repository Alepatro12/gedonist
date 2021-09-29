// import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import MainApp from './App';

test('renders learn react link', () => {
  const container = document.createElement("div");
  ReactDOM.render(<MainApp />, container)
  ReactDOM.unmountComponentAtNode(container);
});
