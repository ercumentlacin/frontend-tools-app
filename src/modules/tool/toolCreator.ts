import { Types } from 'mongoose';
import Tool from './Tool';

interface IModel extends Tool {
  _id: Types.ObjectId;
  [key: string]: any;
}

export default function toolCreator(model: IModel) {
  return {
    _id: String(model._id),
    title: model.title,
    description: model.description,
    tags: model.tags,
    userId: model.userId,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    url: model.url,
  };
}
