import AuthController from './AuthController';
import AuthService from './AuthService';

export default new AuthController(new AuthService()).router;
