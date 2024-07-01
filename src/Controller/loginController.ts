import { pool } from '../db/database';
import path from 'path';
import jwt  from  'jsonwebtoken';


const htmlPath  = path.join(__dirname,  '..',  '..',  '/public/html');

const postLogin = async (req: any, res: any) => {

  try {
    console.log(req.body);
    const {email, password} = req.body;
    const postLogin = await pool.query('SELECT FROM users WHERE email = $1 and password = $2', [email, password]);

    if(postLogin.rows.length  ===  0)  {
      return res.status(400).json({messge: 'Не верный логин или пароль'});
    }

    const token = jwt.sign({id: postLogin.rows[0].id},  process.env.JWT_SECRET as string,  {expiresIn: '1h'});
    res.cookie('token', token, {httpOnly: true, maxAge: 86400});
    res.redirect('/main')

  } catch (error) {
    console.log(error);
    res.status(500).send(`Что то пошло не так. Код ошибки: ${error}`);

  }

}

export { postLogin }