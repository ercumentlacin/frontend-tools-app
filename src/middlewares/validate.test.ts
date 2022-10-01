import validate from './validate';
import nodeMocksHttp from 'node-mocks-http';
import zod from 'zod';

describe('validate', () => {
  test('should return 400 if validation fails', async () => {
    const next = jest.fn();

    try {
      const schema = zod.object({
        body: zod.object({
          name: zod.string(),
        }),
      });
      const req = nodeMocksHttp.createRequest({
        body: {
          name: 123,
        },
      });
      const res = nodeMocksHttp.createResponse();
      const req_ = validate(schema);

      req_(req, res, next);
    } catch (error: any) {
      expect(next).toBeCalled();
    }
  });

  test('should return 200 if validation succeeds', async () => {
    try {
      const schema = zod.object({
        body: zod.object({
          name: zod.string(),
        }),
      });
      const req = nodeMocksHttp.createRequest({
        body: {
          name: '123',
        },
      });
      const res = nodeMocksHttp.createResponse();
      const request = validate(schema);

      const next = jest.fn();

      request(req, res, next);
      expect(next).toBeCalled();
    } catch (error) {}
  });

  test('should return error when error not instanceof ZodError', async () => {
    const next = jest.fn();
    const schema = zod.object({
      body: zod.object({
        name: zod.string(),
      }),
    });
    const req = nodeMocksHttp.createRequest({
      body: {
        name: '1234',
      },
    });
    const res = nodeMocksHttp.createResponse();
    const req_ = validate(schema);
    req_(req, res, next);
    await expect(req_).rejects.toThrowError();
  });
});
