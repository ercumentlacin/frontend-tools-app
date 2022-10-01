import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import ToolController from './ToolController';
import ToolService from './ToolService';
import ToolModel from './ToolModel';
import { app } from '@/app';
import toolCreator from './toolCreator';
import Tool from './Tool';

const utils = {
  async createTool(data?: Tool) {
    const tool = await ToolModel.create(
      Object.assign(
        {
          title: 'Notion',
          url: 'https://notion.so/1',
          description:
            'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
          tags: [
            'organization',
            'planning',
            'collaboration',
            'writing',
            'calendar',
          ],
          userId: '123',
        },
        data ?? {}
      )
    );
    return tool;
  },
};

describe('ToolController', () => {
  let controller: ToolController;

  beforeEach(() => {
    controller = new ToolController(new ToolService(ToolModel));
  });

  test('should be defined', () => {
    expect(ToolController).toBeDefined();
  });

  describe('getAll()', () => {
    test('should be defined', () => {
      expect(controller.getAll).toBeDefined();
    });

    test('should return an array of tools', async () => {
      const tool = await ToolModel.create({
        title: 'Notion',
        url: 'https://notion.so/1',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
        userId: '123',
      });

      const response = await request(app).get('/api/v1/tool/');
      const returnBody = response.body.map((v: any) => {
        v.createdAt = expect.any(Date);
        v.updatedAt = expect.any(Date);
        return v;
      });

      expect(response.status).toBe(StatusCodes.OK);
      const expected = toolCreator({
        ...tool.toJSON(),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(returnBody).toEqual([expected]);
    });
  });

  describe('getById()', () => {
    test('should be defined', () => {
      expect(controller.getById).toBeDefined();
    });

    test('should return a tool', async () => {
      const tool = await utils.createTool();

      const response = await request(app).get(
        `/api/v1/tool/${String(tool._id)}`
      );
      const returnBody = response.body;
      returnBody.createdAt = expect.any(Date);
      returnBody.updatedAt = expect.any(Date);

      expect(response.status).toBe(StatusCodes.OK);
      const expected = toolCreator({
        ...tool.toJSON(),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(returnBody).toEqual(expected);
    });
  });

  describe('search()', () => {
    test('should be defined', () => {
      expect(controller.search).toBeDefined();
    });

    test('should return an array of tools', async () => {
      const tool = await utils.createTool();

      const response = await request(app).get(
        `/api/v1/tool/search?q=${tool.title}`
      );
      const returnBody = response.body.map((v: any) => {
        v.createdAt = expect.any(Date);
        v.updatedAt = expect.any(Date);
        return v;
      });

      expect(response.status).toBe(StatusCodes.OK);
      const expected = toolCreator({
        ...tool.toJSON(),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(returnBody).toEqual([expected]);
    });
  });

  describe('create()', () => {
    test('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    test('should create a tool', async () => {
      const tool = await utils.createTool();

      await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
          name: 'ercu',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const requestForLogin = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const cookie = requestForLogin.body.data as string;

      const response = await request(app)
        .post('/api/v1/tool/')
        .send({
          url: tool.url + '123123',
          title: tool.title,
          description: tool.description,
          tags: tool.tags,
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${cookie}`]);

      const returnBody = response.body;
      returnBody.createdAt = expect.any(Date);
      returnBody.updatedAt = expect.any(Date);
      returnBody._id = expect.any(String);
      returnBody.userId = expect.any(String);

      expect(response.status).toBe(StatusCodes.CREATED);
      const expected = toolCreator({
        ...tool.toJSON(),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        url: tool.url + '123123',
      });
      expect(returnBody).toEqual(expected);
    });
  });

  describe('update()', () => {
    test('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    test('should update a tool', async () => {
      const tool = await utils.createTool({
        url: 'https://notion.so/1',
        description: 'test',
        tags: ['test'],
        title: 'test',
        userId: '123',
      });

      await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
          name: 'ercu',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const requestForLogin = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const cookie = requestForLogin.body.data as string;
      const response = await request(app)
        .put(`/api/v1/tool/${String(tool._id)}`)
        .send({
          url: tool.url + '123123',
          title: tool.title,
          description: tool.description,
          tags: tool.tags,
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${cookie}`]);

      const returnBody = response.body;
      returnBody.createdAt = expect.any(Date);
      returnBody.updatedAt = expect.any(Date);
      returnBody._id = expect.any(String);
      returnBody.userId = expect.any(String);

      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('delete()', () => {
    test('should be defined', () => {
      expect(controller.delete).toBeDefined();
    });

    test('should delete a tool', async () => {
      const tool = await utils.createTool();

      await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
          name: 'ercu',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const requestForLogin = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const cookie = requestForLogin.body.data as string;

      const response = await request(app)
        .delete(`/api/v1/tool/${String(tool._id)}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${cookie}`]);

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });
  });

  describe('deleteAll()', () => {
    test('should be defined', () => {
      expect(controller.deleteAll).toBeDefined();
    });

    test('should delete all tools', async () => {
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
          name: 'ercu',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const requestForLogin = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ercu@gmail.com',
          password: '123456',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      const cookie = requestForLogin.body.data as string;

      const response = await request(app)
        .delete('/api/v1/tool/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${cookie}`]);

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });
  });
});
