import { pool } from '../db/database'



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
    const imageFile = req.file.originalname;
    const fullUrl = 'https://utvchannel.tw1.su' + '/image/team/' + imageFile;


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


  console.log(req.body);
  console.log(req.files)

   const  { id, name, profession  }  = req.body;


   if(!req.file)   {

    res.status(400).send(`Не прислана картинка`);
    console.log('карточка не прислана')
    return

   }


   const imageFile = req.file.originalname;
   const fullUrl = 'https://utvchannel.tw1.su' + '/image/team/' + imageFile;


   const updateTeam  = await pool.query(`UPDATE team SET name = $1, profession = $2, image = $3 WHERE id = $4 RETURNING *`,[name, profession, fullUrl, id]);

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

