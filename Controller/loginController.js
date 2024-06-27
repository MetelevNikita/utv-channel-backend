import { Pool } from "../database/Pool";
import jwt  from  "jsonwebtoken";

//

const postLogin = async (req, res) => {
  try {

    const {email, password} = req.body;

    if(!email || !password) {
      res.status(400).send({message: `не все поля заполнены`})
      return
    }

    const postLogin = await Pool.query(`SELECT * FROM users WHERE email, password = $1, $2 RETURNING *`, [email, password]);

    if(!postLogin.rows.length)  {
      res.status(400).send({message: `не найдено пользователя с таким email`})
      return
    }
    const token  = jwt.sign({id: id}, process.env.SECRET_KEY, {expiresIn: 1000})
    res.status(200).send({token: token})

  } catch (error) {
    res.status(400).send({message: `что то пошло не так ${error}`})
  }
}


export {postLogin}