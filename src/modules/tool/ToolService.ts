import AppError from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';
import Tool from './Tool';
import ToolModel from './ToolModel';

export default class ToolService {
  public constructor(public model: typeof ToolModel) {}

  public async getByUrl(url: string) {
    const tool = await this.model.findOne({ url });
    if (tool === null) {
      throw new AppError(
        `Tool with url ${url} not found`,
        StatusCodes.NOT_FOUND,
        null
      );
    }
    return tool;
  }

  public async alreadyExists(url: string): Promise<boolean> {
    const tool = await this.model.findOne({ url });
    return tool !== null;
  }

  public create = async (input: Tool) => {
    const isUrlAlreadyUsed = await this.alreadyExists(input.url);
    if (isUrlAlreadyUsed) {
      throw new AppError(
        `Tool with url ${input.url} already exists`,
        StatusCodes.CONFLICT,
        null
      );
    }

    const doc = await this.model.create(input);

    await doc.save();

    const data = {
      _id: String(doc._id),
      title: doc.title,
      description: doc.description,
      tags: doc.tags,
      userId: doc.userId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      url: doc.url,
    };
    return data;
  };

  public getAll = async () => {
    const tools = await this.model.find();
    return tools;
  };

  public getById = async (id: string) => {
    const tool = await this.model.findById(id);
    if (tool === null) {
      throw new AppError(
        `Tool with id ${id} not found`,
        StatusCodes.NOT_FOUND,
        null
      );
    }
    return tool;
  };

  public deleteOne = async (id: string) => {
    const tool = await this.model.findByIdAndDelete(id);
    if (tool === null) {
      throw new AppError(
        `Tool with id ${id} not found`,
        StatusCodes.NOT_FOUND,
        null
      );
    }
    return tool;
  };

  public updateOne = async (id: string, input: Tool) => {
    const tool = await this.model.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (tool === null) {
      throw new AppError(
        `Tool with id ${id} not found`,
        StatusCodes.NOT_FOUND,
        null
      );
    }
    return tool;
  };

  public search = async (query: string) => {
    const tools = await this.model.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    });
    return tools;
  };

  public deleteAll = async () => {
    const tools = await this.model.deleteMany();
    return tools;
  };

  public deleteAllByUserId = async (userId: string) => {
    const tools = await this.model.deleteMany({ userId });
    return tools;
  };

  public getAllByUserId = async (userId: string) => {
    const tools = await this.model.find({ userId });
    return tools;
  };
}
