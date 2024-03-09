import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWT_SECRECT;

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}
