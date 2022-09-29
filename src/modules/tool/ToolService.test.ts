import ToolService from './ToolService';
import ToolModel from './ToolModel';
import Tool from './Tool';
import { BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';
import * as db from '@/utils/db';
import AppError from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';

const utils_ = {
  createTool(input?: Tool) {
    const createTool = new ToolModel({
      title: 'Notion',
      url: 'https://notion.so/',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      tags: [
        'organization',
        'planning',
        'collaboration',
        'writing',
        'calendar',
      ],
      userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
      ...input,
    });
    return createTool;
  },

  async saveTool(createdTool?: ReturnType<typeof this.createTool>) {
    const createdTool_ = createdTool ?? this.createTool();
    const savedTool = await createdTool_.save();
    return savedTool;
  },
};

describe('ToolService', () => {
  beforeAll(async () => {
    await db.setUp();
  });

  afterEach(async () => {
    await db.dropCollections();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });
  let todoModel: ReturnModelType<typeof Tool, BeAnObject>;
  let toolService: ToolService;

  beforeEach(() => {
    todoModel = ToolModel;
    toolService = new ToolService(todoModel);
  });

  it('should be defined', () => {
    expect(toolService).toBeDefined();
  });

  describe('getAll()', () => {
    test('should defined', async () => {
      expect(toolService.getAll).toBeDefined();
    });
    test('should return tools', async () => {
      const data = await toolService.getAll();
      expect(data).toEqual([]);
    });
  });

  describe('create()', () => {
    test('should create and save successful', async () => {
      toolService.alreadyExists = jest.fn().mockReturnValue(false);

      const tool: Tool = new ToolModel({
        title: 'Notion',
        url: 'https://notion.so/',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
        userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
      });

      const savedTool = await toolService.create(tool);
      expect(savedTool._id).toBeDefined();
      expect(savedTool.title).toBe(tool.title);
      expect(savedTool.url).toBe(tool.url);
      expect(savedTool.description).toBe(tool.description);
      expect(savedTool.tags).toBe(tool.tags);
    });

    test('should throw error when tool already exist', async () => {
      toolService.alreadyExists = jest.fn().mockReturnValue(true);

      const tool: Tool = new ToolModel({
        title: 'Notion',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
        userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
        url: 'https://notion.so/',
      });

      await expect(
        async () => await toolService.create(tool)
      ).rejects.toThrowError(
        new AppError(
          `Tool with url ${tool.url} already exists`,
          StatusCodes.CONFLICT,
          null
        )
      );
    });
  });

  describe('getByUrl()', () => {
    test('should return tool', async () => {
      toolService.alreadyExists = jest.fn().mockReturnValue(false);

      const tool: Tool = new ToolModel({
        title: 'Notion',
        url: 'https://notion.so/',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
        userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
      });

      const savedTool = await toolService.create(tool);
      const foundTool = await toolService.getByUrl(savedTool.url);
      if (foundTool !== null) {
        expect(foundTool._id).toBeDefined();
        expect(foundTool.title).toBe(tool.title);
        expect(foundTool.url).toBe(tool.url);
        expect(foundTool.description).toBe(tool.description);
        expect(foundTool.tags).toStrictEqual(tool.tags);
      }
    });

    test('should return error', async () => {
      const url = 'https://21notion.so/';

      await expect(async () => await toolService.getByUrl(url)).rejects.toThrow(
        new AppError(
          `Tool with url ${url} not found`,
          StatusCodes.NOT_FOUND,
          null
        )
      );
    });
  });

  describe('alreadyExists()', () => {
    test('should be defined', () => {
      expect(toolService.alreadyExists).toBeDefined();
    });

    test('should return false when url unexist', async () => {
      const result = await toolService.alreadyExists('https://notion.so/');
      expect(result).toBe(false);
    });
    test('should return false when url unexist', async () => {
      const createTool = new ToolModel({
        title: 'Notion',
        url: 'https://notion.so/',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
        userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
      });

      await createTool.save();

      const result = await toolService.alreadyExists('https://notion.so/');
      expect(result).toBe(true);
    });
  });

  describe('getById()', () => {
    test('should be defined', () => {
      expect(toolService.getById).toBeDefined();
    });

    test('should return tool', async () => {
      const createTool = new ToolModel({
        title: 'Notion',
        url: 'https://notion.so/',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
        userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
      });

      const savedTool = await createTool.save();

      const foundTool = await toolService.getById(savedTool._id);
      if (foundTool !== null) {
        expect(foundTool._id).toBeDefined();
        expect(foundTool.title).toBe(createTool.title);
        expect(foundTool.url).toBe(createTool.url);
        expect(foundTool.description).toBe(createTool.description);
        expect(foundTool.tags).toStrictEqual(createTool.tags);
      }
    });

    test('should return AppError', async () => {
      const id = '5f9f1c9b9b9b9b9b9b9b9b9b';

      await expect(async () => await toolService.getById(id)).rejects.toThrow(
        new AppError(
          `Tool with id ${id} not found`,
          StatusCodes.NOT_FOUND,
          null
        )
      );
    });
  });

  describe('deleteOne()', () => {
    test('should return tool', async () => {
      const createTool = utils_.createTool();

      const savedTool = await createTool.save();

      const foundTool = await toolService.deleteOne(savedTool._id);
      if (foundTool !== null) {
        expect(foundTool._id).toBeDefined();
        expect(foundTool.title).toBe(createTool.title);
        expect(foundTool.url).toBe(createTool.url);
        expect(foundTool.description).toBe(createTool.description);
        expect(foundTool.tags).toStrictEqual(createTool.tags);
      }
    });

    test('should return AppError', async () => {
      const id = '5f9f1c9b9b9b9b9b9b9b9b9b';

      await expect(async () => await toolService.deleteOne(id)).rejects.toThrow(
        new AppError(
          `Tool with id ${id} not found`,
          StatusCodes.NOT_FOUND,
          null
        )
      );
    });
  });

  describe('updateOne()', () => {
    test('should be defined', () => {
      expect(toolService.updateOne).toBeDefined();
    });

    test('should return updated tool', async () => {
      const createTool = utils_.createTool();

      const savedTool = await createTool.save();

      const updatedTool = await toolService.updateOne(savedTool._id, {
        title: 'Notion',
        url: 'https://notion.so/',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        tags: [
          'organization',
          'planning',
          'collaboration',
          'writing',
          'calendar',
        ],
        userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
      });

      if (updatedTool !== null) {
        expect(updatedTool._id).toBeDefined();
        expect(updatedTool.title).toBe(createTool.title);
        expect(updatedTool.url).toBe(createTool.url);
        expect(updatedTool.description).toBe(createTool.description);
        expect(updatedTool.tags).toStrictEqual(createTool.tags);
      }
    });

    test('should return AppError', async () => {
      const id = '5f9f1c9b9b9b9b9b9b9b9b9b';

      await expect(
        async () =>
          await toolService.updateOne(id, {
            title: 'Notion',
            url: 'https://notion.so/',
            description:
              'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
            tags: [
              'organization',
              'planning',
              'collaboration',
              'writing',
              'calendar',
            ],
            userId: '5f9f1c9b9b9b9b9b9b9b9b9b',
          })
      ).rejects.toThrow(
        new AppError(
          `Tool with id ${id} not found`,
          StatusCodes.NOT_FOUND,
          null
        )
      );
    });
  });

  describe('search()', () => {
    test('should be defined', () => {
      expect(toolService.search).toBeDefined();
    });

    test('should return tool', async () => {
      const createTool = utils_.createTool();

      const savedTool = await createTool.save();
      const foundTool = await toolService.search(String(savedTool._id));
      if (foundTool.length > 0) {
        foundTool.forEach((tool) => {
          expect(tool._id).toBeDefined();
          expect(tool.title).toBe(createTool.title);
          expect(tool.url).toBe(createTool.url);
          expect(tool.description).toBe(createTool.description);
          expect(tool.tags).toStrictEqual(createTool.tags);
        });
      } else {
        expect(foundTool.length).toBe(0);
        expect(foundTool).toStrictEqual([]);
      }
    });
  });

  describe('deleteAll()', () => {
    test('should be defined', () => {
      expect(toolService.deleteAll).toBeDefined();
    });

    test('should return deletedCount', async () => {
      const createTool = utils_.createTool();

      await createTool.save();
      const deletedCount = await toolService.deleteAll();
      expect(deletedCount.deletedCount).toBe(1);
    });
  });

  describe('deleteAllByUserId()', () => {
    test('should be defined', () => {
      expect(toolService.deleteAllByUserId).toBeDefined();
    });

    test('should return deletedCount', async () => {
      const createTool = utils_.createTool();

      await createTool.save();
      const deletedCount = await toolService.deleteAllByUserId(
        '5f9f1c9b9b9b9b9b9b9b9b9b'
      );
      expect(deletedCount.deletedCount).toBe(1);
    });
  });

  describe('getAllByUserId()', () => {
    test('should be defined', () => {
      expect(toolService.getAllByUserId).toBeDefined();
    });

    test('should return tools', async () => {
      const createTool = utils_.createTool();

      await createTool.save();
      const tools = await toolService.getAllByUserId(
        '5f9f1c9b9b9b9b9b9b9b9b9b'
      );

      if (tools.length > 0) {
        tools.forEach((tool) => {
          expect(tool._id).toBeDefined();
          expect(tool.title).toBe(createTool.title);
          expect(tool.url).toBe(createTool.url);
          expect(tool.description).toBe(createTool.description);
          expect(tool.tags).toStrictEqual(createTool.tags);
        });
      } else {
        expect(tools.length).toBe(0);
        expect(tools).toStrictEqual([]);
      }
    });
  });
});
