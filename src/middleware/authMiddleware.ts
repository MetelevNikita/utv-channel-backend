import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.cookies.token
  console.log(token);

  try {

    if (!token) {
      return res.redirect('/login');
    }

    const user = jwt.verify(token, process.env.JWT_SECRET as string)

      req.user = user
      console.log(user);
      next();

  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/login');
  }



}


export default authMiddleware;