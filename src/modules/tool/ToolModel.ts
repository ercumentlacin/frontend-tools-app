import { getModelForClass } from '@typegoose/typegoose';
import Tool from './Tool';

const ToolModel = getModelForClass(Tool);

export default ToolModel;
