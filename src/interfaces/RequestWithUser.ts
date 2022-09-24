import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface RequestWithUser extends Request {
  user?: string | JwtPayload;
}
