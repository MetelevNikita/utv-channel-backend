import { pool } from '../db/database';
import jwt  from  'jsonwebtoken';


const postLogin = async (req: any, res: any) => {

  try {

    const {email, password} = req.body;

    console.log(req.body)


    const postLogin = await pool.query('SELECT FROM users WHERE email = $1 and password = $2', [email, password]);

    if(postLogin.rows.length  ===  0)  {
      return res.status(400).send('Не верный логин или пароль');
    }

    const token = jwt.sign({id: postLogin.rows[0].id},  process.env.JWT_SECRET as string,  {expiresIn: '1d'});
    res.cookie('token', token, {httpOnly: true, maxAge:  1000 * 60 * 60 * 24 * 7, sameSite: 'none'});
    res.status(200).send({token: token})

  } catch (error) {
    console.log(error);
    res.status(500).send(`Что то пошло не так. Код ошибки: ${error}`);

  }

}

export { postLogin }