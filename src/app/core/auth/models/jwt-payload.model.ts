import { JwtPayload as Jwt } from 'jwt-decode';
import { UserRole } from '../../models/user.model';

export interface JwtPayload extends Jwt {
  id: string;
  sub: string;
  role: UserRole;
}