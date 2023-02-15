import {
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  describe,
  expect,
  test
} from '@jest/globals';

import {UserController} from './user.conrtoller';
import express, {Router} from "express";
import {createMock} from "ts-auto-mock";
import {method, On} from 'ts-auto-mock/extension';
import {IUserRepository} from "../../database/repositories/i.user.repository";

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
  let mockRepo: IUserRepository;

  beforeEach(() => {
    mockRouter = createMock<express.Router>();
    mockRepo = createMock<IUserRepository>();
  });

  test('method should be connected into router', () => {
    const mockGetMethod: jest.Mock = On(mockRouter).get(method(mock => mock.get));
    const mockPostMethod: jest.Mock = On(mockRouter).get(method(mock => mock.post));

    const mc = new UserController({connectionString: "", port: 3000, dbtype: ""}, mockRepo, mockRouter);

    expect(mockGetMethod).toHaveBeenCalledTimes(1);
    expect(mockGetMethod).toHaveBeenCalledWith("v1/user", mc.users);
    expect(mockPostMethod).toHaveBeenCalledTimes(1);
    expect(mockPostMethod).toHaveBeenCalledWith("v1/user", mc.addUser);

  });

});
