import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// logger

import {logger } from '../util/logging'


const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.cookies.token

  try {

    if (!token) {
      logger.error('Не получен токен доступа')
      return res.redirect('/login');
    }

    const user: any = jwt.verify(token, process.env.JWT_SECRET as string)

      req.user = user
      logger.info(`Пользователь авторизован ${JSON.stringify(user)}`)
      next();

  } catch (error: any) {
    logger.error(`Ошибка авторизации пользователя ${error.message}`)
    res.clearCookie('token');
    return res.redirect('/login');
  }



}


export default authMiddleware;