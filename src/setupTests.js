// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// import 'jest-extended';

global.ResizeObserver = require('resize-observer-polyfill');

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
  
// jest.mock('./__tests__/utilities/resizeObserver.js', () => () => ({
//   __esModule: true,
//   default: jest.fn().mockImplementation(() => ({
//       observe: jest.fn(),
//       unobserve: jest.fn(),
//       disconnect: jest.fn(),
//   })),
// }));