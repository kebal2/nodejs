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
import {createMock} from "ts-auto-mock";
import {method, On} from 'ts-auto-mock/extension';

beforeEach(() => {

});

afterEach(() => {

});

afterAll(() => {

});

beforeAll(() => {

})

beforeEach(() => {

});

describe('Mirror Controller should return send data', () => {

  let mockRouter: express.Router;

  beforeEach(() => {
    mockRouter = createMock<express.Router>();
  });

  test('reflect method should be POST', () => {
    const mockGetMethod: jest.Mock = On(mockRouter).get(method(mock => mock.get));
    const mockPostMethod: jest.Mock = On(mockRouter).get(method(mock => mock.post));

    const mc = new MirrorController(mockRouter);

    expect(mockGetMethod).toHaveBeenCalledTimes(0);
    expect(mockPostMethod).toHaveBeenCalledTimes(1);
    expect(mockPostMethod).toHaveBeenCalledWith("/mirror", mc.reflect);

  });

});
