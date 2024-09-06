import { pool } from '../db/database'

//

import { programType } from '../types/types'

const getProgram = async (req: any, res: any) => {
  try {

    const allProgram = await pool.query("SELECT * FROM program")

    if (allProgram.rows.length < 1) {
      res.status(200).json({message: 'Список программ пуст'})
      return
    }

    res.status(200).json(allProgram.rows)

  } catch (error: any) {

    console.log(error);
    res.status(400).json({message: error.message});

  }
}


const getSingleProgram = async (req: any, res: any) => {
  try {

    const { id } = req.params
    const singleProgrna = await pool.query("SELECT * FROM program WHERE id = $1", [id])

    if (singleProgrna.rows.length < 1) {
      res.status(200).json({message: 'Программа не найдена'})
      return
    }

    res.status(200).json(singleProgrna.rows[0])

  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}


const postProgram = async (req: any, res: any) => {
  try {

    const {date, title, subtitle, description, link} = req.body
    const imageFile = req.file.originalname;
    const fullUrl = 'https://utvchannel.tw1.su' + '/image/program/' + imageFile;

    const newProgram = await pool.query("INSERT INTO program (image, date, title, subtitle, description, link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [fullUrl, date, title, subtitle, description, link])


    if (newProgram.rows.length < 1) {
      res.status(200).json({message: 'Программа не создана'})
      return
    }

    res.status(200).json(newProgram.rows[0])

  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}


const deleteProgram = async (req: any, res: any) => {
  try {

    const { id } = req.params
    const deleteProgram = await pool.query("DELETE FROM program WHERE id = $1 RETURNING *", [id])

    if (deleteProgram.rows.length < 1) {
      res.status(200).json({message: 'Программа не удалена'})
      return
    }

    res.status(200).json(deleteProgram.rows[0])


  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}


const updateProgram = async (req: any, res: any) => {

  try {

    const { id, date, title, subtitle, description, link } = req.body
    const imageFile = req.file.originalname;
    const fullUrl = 'https://utvchannel.tw1.su' + '/image/program/' + imageFile;


    const updateProgram = await pool.query("UPDATE program SET image = $1, date = $2, title = $3, subtitle = $4, description = $5, link = $6 WHERE id = $7 RETURNING *", [fullUrl, date, title, subtitle, description, link, id])

    if (updateProgram.rows.length < 0) {
      res.status(200).json({message: 'Программа не обновлена'})
      return
    }

    res.status(200).json(updateProgram.rows[0])

  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }

}

export { getProgram, getSingleProgram, postProgram, deleteProgram, updateProgram }