import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
    autoIndex: true,
    collection: 'Tools',
  },
  options: {
    allowMixed: 0,
  },
})
export default class Tool extends TimeStamps {
  @prop({
    required: true,
    unique: true,
    trim: true,
    index: true,
  })
  url: string;

  @prop({
    required: true,
  })
  title: string;

  @prop({
    required: true,
  })
  description: string;

  @prop({
    required: true,
  })
  tags: string[];

  @prop({
    default: new Date(),
  })
  createdAt?: Date;

  @prop({
    default: new Date(),
  })
  updatedAt?: Date;

  @prop({
    required: true,
  })
  userId: string;
}
