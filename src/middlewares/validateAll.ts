import { AnyZodObject } from 'zod';
import validate from './validate';

const validateAll = <T extends AnyZodObject>(schemas: T[]) => {
  return schemas.map((schema) => validate(schema));
};
export default validateAll;
