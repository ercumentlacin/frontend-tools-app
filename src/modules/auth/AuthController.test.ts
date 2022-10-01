import AuthController from './AuthController';
import AuthService from './AuthService';
import Auth from './Auth';
jest.mock<typeof Auth>('./Auth');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    authController = new AuthController(authService);
  });

  test('should be defined', () => {
    expect(AuthController).toBeDefined();
  });

  test('should have a router', () => {
    expect(authController.router).toBeDefined();
  });
});
