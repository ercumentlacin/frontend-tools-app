import AuthService from '../auth/AuthService';
import UserController from './UserController';

export default new UserController(new AuthService()).router;
