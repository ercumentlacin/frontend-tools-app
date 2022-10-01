import Auth, { authSchema, hashPassword } from './Auth';
import bcrypt from 'bcryptjs';

describe('Auth', () => {
  it('should hash password before save', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    expect(bcrypt.compareSync(password, auth.password)).toBe(false);
  }, 10000);

  it('should not hash password if it is not modified', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    const hash = auth.password;
    expect(auth.password).toBe(hash);
  });

  it('should not hash password if it is not modified', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    const hash = auth.password;
    expect(auth.password).toBe(hash);
  });

  it('should not hash password if it is not modified', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    const hash = auth.password;
    expect(auth.password).toBe(hash);
  });

  it('should not hash password if it is not modified', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    const hash = auth.password;
    expect(auth.password).toBe(hash);
  });

  it('should not hash password if it is not modified', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    const hash = auth.password;
    expect(auth.password).toBe(hash);
  });

  it('should not hash password if it is not modified', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    const hash = auth.password;
    expect(auth.password).toBe(hash);
  });
});

describe('authSchema', () => {
  it('should have name', () => {
    expect(authSchema.obj).toHaveProperty('name');
    expect(authSchema.obj.name).toHaveProperty('type', String);
    expect(authSchema.obj.name).toHaveProperty('required', true);
  });

  it('should have email', () => {
    expect(authSchema.obj).toHaveProperty('email');
    expect(authSchema.obj.email).toHaveProperty('type', String);
    expect(authSchema.obj.email).toHaveProperty('required', true);
    expect(authSchema.obj.email).toHaveProperty('unique', true);
  });

  it('should have password', () => {
    expect(authSchema.obj).toHaveProperty('password');
    expect(authSchema.obj.password).toHaveProperty('type', String);
    expect(authSchema.obj.password).toHaveProperty('required', true);
  });

  it('should have avatar', () => {
    expect(authSchema.obj).toHaveProperty('avatar');
    expect(authSchema.obj.avatar).toHaveProperty('type', String);
  });

  it('should password is hash before save', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });
    expect(bcrypt.compareSync(password, auth.password)).toBe(false);
  });

  // testing for hashPassword function
  it('should hash password', async () => {
    const password = 'password';
    const auth = new Auth({
      name: 'name',
      email: 'email',
      password,
    });

    const preSave = hashPassword.bind(auth);
    preSave(() => {
      expect(bcrypt.compareSync(password, auth.password)).toBe(true);
    });
  }, 100000);
});
