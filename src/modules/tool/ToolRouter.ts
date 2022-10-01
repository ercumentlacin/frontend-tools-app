import ToolController from './ToolController';
import ToolService from './ToolService';
import ToolModel from './ToolModel';

export default new ToolController(new ToolService(ToolModel)).router;
