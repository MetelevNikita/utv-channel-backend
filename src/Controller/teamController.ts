import { pool } from '../db/database'



const getTeam = async (req: Request | any, res: Response | any) => {
  try {

    const getTeam = await pool.query(`SELECT * FROM team`);

    if(getTeam.rows.length <= 0)  {
      res.status(400).send(`Список с командой пуст`);
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

    const getSingleTeam  = await pool.query('SELCET * FROM team WHERE id = $1', [id])

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
    const imageFile = req.file.originalname;
    const fullUrl = req.protocol + '://' + req.get('host') + '/image/team/' + imageFile;


    const newTeam = await pool.query(`INSERT INTO team (name, profession, image) VALUES ($1, $2, $3) RETURNING *`, [name, profession, fullUrl]);

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
   const  { image  }  = req.files;

   if(!name   || !profession   || !image)    {
     res.status(400).send(`Заполните все поля`);
     return;
    }

   const updateTeam  = await pool.query(`UPDATE team SET name = $1, profession = $2, image = $3 WHERE id = $4 RETURNING *`,[name, profession, image, id]);

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

    res.status(200).send(deleteTeam.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}

export {getTeam, getSingleTeam, postTeam, updateTeam, deleteTeam}

