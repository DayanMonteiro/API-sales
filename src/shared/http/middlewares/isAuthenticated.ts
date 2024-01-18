import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPaylod {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  //  Beares token - vem em duas palavras o Beater no indice 1 e o token no segundo separado por espaço
  // como queremos apenas o token fazemos o split separando por espaço vazio e pegando apenas o token que seria o indice 2 do array
  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as ITokenPaylod;

    // pra esse user não quebrar tem a gambeta feita src/@types/express/index.d.ts
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
