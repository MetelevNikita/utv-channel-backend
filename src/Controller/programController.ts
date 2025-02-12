import { pool } from '../db/database'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { v4 as uuid } from 'uuid'

//

import { programType } from '../types/types'

// 

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

    const idProgram = uuid()

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host
    const url = protocol + '://' + host + '/image/program/' + `program_${idProgram}.jpeg`;

    const inputPath = path.join(__dirname, '../../public/image/program', req.file.originalname)
    const outputPath = path.join(__dirname, '../../public/image/program', `program_${idProgram}.jpeg`)

    await sharp(inputPath).png({quality: 90}).resize(648, 400).toFile(outputPath)
    fs.unlinkSync(inputPath)


    const newProgram = await pool.query("INSERT INTO program (image, date, title, subtitle, description, link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [url, date, title, subtitle, description, link])


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


    const idProgram = uuid()

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host
    const url = protocol + '://' + host + '/image/program/' + `program_${idProgram}.png`;

    const inputPath = path.join(__dirname, '../../public/image/program', req.file.originalname)
    const outputPath = path.join(__dirname, '../../public/image/program', `program_${idProgram}.png`)

    await sharp(inputPath).png({quality: 90}).resize(648, 400).toFile(outputPath)
    fs.unlinkSync(inputPath)


    const updateProgram = await pool.query("UPDATE program SET image = $1, date = $2, title = $3, subtitle = $4, description = $5, link = $6 WHERE id = $7 RETURNING *", [url, date, title, subtitle, description, link, id])

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