import { JwtPayload as Jwt } from 'jwt-decode';
import { UserRole } from '../../models/user.model';

export interface JwtPayload extends Jwt {
  sub: string;
  role: UserRole;
  name: string;
}