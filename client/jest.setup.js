// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { expect } from '@jest/globals';
global.expect = expect;

import "@testing-library/jest-dom/extend-expect";

const fetch = require('node-fetch');
global.fetch = fetch;