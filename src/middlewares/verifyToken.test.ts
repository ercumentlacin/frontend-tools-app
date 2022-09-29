import verifyToken from './verifyToken';
import nodeMocksHttp from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';
import AppError from '@/utils/AppError';
import jsonwebtoken from 'jsonwebtoken';

describe('verifyToken', () => {
  it('should throw an error if token is undefined', () => {
    const req = nodeMocksHttp.createRequest();
    const res = nodeMocksHttp.createResponse();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(next).toBeCalledWith(
      new AppError('Unauthorized', StatusCodes.UNAUTHORIZED, null)
    );
  });

  it('should throw an error if token is invalid', () => {
    const req = nodeMocksHttp.createRequest({
      cookies: {
        token: 'invalid token',
      },
    });
    const res = nodeMocksHttp.createResponse();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(next).toBeCalledWith(
      new AppError('Invalid Token', StatusCodes.UNAUTHORIZED, null)
    );
  });

  it('should call next if token is valid', () => {
    const req = nodeMocksHttp.createRequest({
      cookies: {
        token: 'valid token',
      },
    });
    const res = nodeMocksHttp.createResponse();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it('should set req.user if token is valid', () => {
    const mockVerify =
      jest.createMockFromModule<typeof jsonwebtoken>('jsonwebtoken');
    mockVerify.verify = jest.fn().mockReturnValue('valid token');
    const req = nodeMocksHttp.createRequest({
      cookies: {
        token: 'valid token',
      },
    });
    const res = nodeMocksHttp.createResponse();
    const next = jest.fn();

    verifyToken(req, res, next);

    const verified = mockVerify.verify(
      'valid token',
      process.env.TOKEN_SECRET as string
    );
    req.user = verified;
    expect(req.user).toEqual(verified);
    expect(next).toBeCalledTimes(1);
  });
});
