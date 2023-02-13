import {
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  describe,
  expect,
  test
} from '@jest/globals';

import {MirrorController} from './mirror.conrtoller';
import express, {Router} from "express";

beforeEach(() => {

});

afterEach(() => {

});

afterAll(() => {

});

beforeAll(() => {

})

beforeEach(() => {
  jest.mocked(Router).mockClear();
});

// jest.mock('express', () => {
//   return {
//     Router: jest.fn().mockImplementation(() => {
//       return {
//         post: jest.fn().mockImplementation((rootPath: string, method: (request: express.Request, response: express.Response) => {}) => { }),
//         get: jest.fn().mockImplementation((rootPath: string, method: (request: express.Request, response: express.Response) => {}) => {}),
//       };
//     })
//   };
// });

jest.mock('express', () => {
  return {
    Router: jest.fn().(() => {
      return {
        get: jest.fn(),
      };
    })
  };
});


describe('Mirror Controller should return send data', () => {

  const mockedRouter = jest.mocked(Router);

  test('reflect method should be POST', () => {
    const mc = new MirrorController(mockedRouter.mock.instances[0]);

    expect(mockedRouter.mock.calls.length).toBe(1);

    console.log(mockedRouter.mock.results);

    // expect(mockedRouter.mock.results[0]).toBe(1);
  });

});
