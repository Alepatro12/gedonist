// import React from 'react';
// import { Logout } from './index';
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";

// let container = null;

// beforeEach(() => {
// 	// подготавливаем DOM-элемент, куда будем рендерить
// 	container = document.createElement("div");
// 	document.body.appendChild(container);
// });

// afterEach(() => {
// 	// подчищаем после завершения
// 	unmountComponentAtNode(container);
// 	container.remove();
// 	container = null;
// });
  

// describe('Logout component', () => {
// 	test('After creation span should be displayed', () => {
// 		act(() => {
// 			render(<Logout />, container);
// 		});
// 		expect (container.textContent).toBe('');
// 	});
// });