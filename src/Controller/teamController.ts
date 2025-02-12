import { pool } from '../db/database'
import { v4 as uuid } from 'uuid'
import sharp from 'sharp'
import path from 'path';
import fs from 'fs';

const id = uuid();

const getTeam = async (req: Request | any, res: Response | any) => {
  try {

    const getTeam = await pool.query(`SELECT * FROM team`);

    if(getTeam.rows.length <= 0)  {
      res.status(400).send([]);
      return
    }

    res.status(200).send(getTeam.rows);

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);

  }
}


const getSingleTeam = async (req: Request | any, res: Response | any) => {
  try {

    const { id } = req.params;

    const getSingleTeam  = await pool.query('SELECT * FROM team WHERE id = $1', [id])

    if(!getSingleTeam.rows[0])  {
      res.status(400).send(`Сотрудник с таким id не найден`);
      return;
    }

    res.status(200).send(getSingleTeam.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}




const postTeam  = async  (req: any, res: any)  =>  {
  try {

    const { name, profession } = req.body;
    const id = uuid();
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host


    const inputPath = path.join(__dirname, '../../public/image/team/', req.file.originalname)
    const outputPath = path.join(__dirname, '../../public/image/team/', `image_${id}.jpeg`)

    const url = `${protocol}://${host}/image/team/image_${id}.jpeg`;


    await sharp(inputPath).jpeg({ quality: 90 }).resize(300, 400).toFile(outputPath);
    fs.unlinkSync(inputPath)


    const newTeam = await pool.query(`INSERT INTO team (name, profession, image) VALUES ($1, $2, $3) RETURNING *`, [name, profession, url]);

    if(!newTeam.rows[0]) {
      res.status(400).send(`Карточка сотрудника не создана`);
      return;
    }

    console.log(newTeam.rows[0]);
    res.status(200).send(newTeam.rows[0]);


  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}



const updateTeam   = async  (req: Request  | any, res: Response  | any)  =>  {

  try  {

   const  { id, name, profession  }  = req.body;


   if(!req.file)   {

    res.status(400).send(`Не прислана картинка`);
    console.log('карточка не прислана')
    return

   }

   const idTeam = uuid();
   const protocol = req.headers['x-forwarded-proto'] || 'http';
   const host = req.headers.host


   const inputPath = path.join(__dirname, '../../public/image/team/', req.file.originalname)
   const outputPath = path.join(__dirname, '../../public/image/team/', `image_${idTeam}.jpeg`)

   const url = `${protocol}://${host}/image/team/image_${idTeam}.jpeg`;

   await sharp(inputPath).jpeg({ quality: 90 }).resize(300, 400).toFile(outputPath);
   fs.unlinkSync(inputPath)

   const updateTeam  = await pool.query(`UPDATE team SET name = $1, profession = $2, image = $3 WHERE id = $4 RETURNING *`,[name, profession, url, id]);

   if(!updateTeam.rows[0])  {
    res.status(400).send(`Карточка сотрудника не изменена`);
    return;

   }

   res.status(200).send(updateTeam.rows[0]);

  } catch (error) {

    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}


const deleteTeam  = async  (req: Request  | any, res: Response  | any)  =>  {
  try {
    const { id } = req.params;

    const deleteTeam  = await pool.query(`DELETE FROM team WHERE id  =  $1`, [id]);

    if(!deleteTeam.rows[0])   {
      res.status(400).send(`Карточка сотрудника не удалена`);
      return;

    }

    res.status(200).json({message: 'Карточка удалена'});

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}

export {getTeam, getSingleTeam, postTeam, updateTeam, deleteTeam}

