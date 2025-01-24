import { pool } from '../db/database';
import path from 'path';
import jwt  from  'jsonwebtoken';


const htmlPath  = path.join(__dirname,  '..',  '..',  '/public/html');


const getUsers = async (req: any, res: any) => {
  try {

    const getUser = await pool.query('SELECT * FROM users');
    if(getUser.rows.length  < 1)  {
      res.status(400).json({messge: 'Не верный логин или пароль'});
      return
    }

    res.status(200).json(getUser.rows);


  } catch (error) {
    res.status(500).json({message: 'Ошибка'})
  }
}



const postLogin = async (req: any, res: any) => {

  try {

    const {email, password} = req.body;

    const postLogin = await pool.query('SELECT * FROM users WHERE email = $1 and password = $2', [email, password]);

    if(postLogin.rows.length  <  1)  {
      res.status(400).json({messge: 'Не верный логин или пароль'});
      return;
    }
    const token = jwt.sign({id: postLogin.rows[0].id},  process.env.JWT_SECRET as string,  {expiresIn: '1h'});
    res.cookie('userId', postLogin.rows[0].id);
    res.cookie('token', token, {httpOnly: true});
    res.status(200).send({message: `Успешно`})

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);

  }

}

export { postLogin, getUsers }