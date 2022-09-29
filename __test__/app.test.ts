import request from 'supertest';
import App, { app } from '../src/app';

describe('app', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: 'Hello World!',
    });
  });

  it('should return 404', async () => {
    const response = await request(app).get('/not-found');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: '🔍 - Not Found - /not-found',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : expect.any(String),
      details: null,
    });
  });
});

describe('App', () => {
  const app_ = new App();

  it('should be defined', () => {
    expect(App).toBeDefined();
  });

  it('should be an instance of App', () => {
    expect(app_).toBeInstanceOf(App);
  });

  it('should have a property app', () => {
    expect(app_).toHaveProperty('app');
  });

  it('should have a property app of type Application', () => {
    expect(app_.app).toBeInstanceOf(Object);
  });

  it('should have a property app with a property get', () => {
    expect(app_.app).toHaveProperty('get');
  });

  it('should have a property app with a property get of type Function', () => {
    expect(app_.app.get).toBeInstanceOf(Function);
  });

  it('should have a property app with a property use', () => {
    expect(app_.app).toHaveProperty('use');
  });

  it('should have a property app with a property use of type Function', () => {
    expect(app_.app.use).toBeInstanceOf(Function);
  });

  it('should have a property initializeMiddleware', () => {
    expect(app_).toHaveProperty('initializeMiddleware');
  });

  it('should have a property initializeRoutes', () => {
    expect(app_).toHaveProperty('initializeRoutes');
  });

  it('should have a property errorHandler', () => {
    expect(app_).toHaveProperty('errorHandler');
  });
});
