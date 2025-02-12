
import { pool } from "../db/database";
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid'


const getProjects = async(req: any, res: any) => {
  try {


    const allprojects = await pool.query(`SELECT * FROM project`);

    if (allprojects.rows.length < 1) {
      res.status(404).json({message: "Проекты не найдены"});
      return
    }

    res.status(200).json(allprojects.rows);



  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}



const getOneProject  = async (req: any, res: any)  =>  {
  try {

    const { id } = req.params;

    console.log(id);

    const sngleProject  = await pool.query('SELECT * FROM project WHERE id = $1', [id])

    if (sngleProject.rows.length  <  1)  {
      res.status(404).json({message:  "No project found"});
      return
    }

    res.status(200).json(sngleProject.rows[0]);

  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}



const postProject  = async (req: any, res: any)  =>  {
  try {


    console.log(req.body);
    const id = uuid()

    const { title, description, duration, year, author, channel, trailer } = req.body;
    const imageFile = req.file.originalname;


    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host;

    const url = protocol + '://' + host + '/image/project/' + `project_${id}.jpeg`;


    const inputPath = path.join(__dirname, '../../public/image/project', req.file.originalname)
    const outputPath = path.join(__dirname, '../../public/image/project', `project_${id}.jpeg`)

    await sharp(inputPath).jpeg({quality: 90}).resize(540, 304).toFile(outputPath)
    fs.unlinkSync(inputPath)


    const postProject = await pool.query('INSERT INTO project (title, description, duration, year, author, channel, trailer, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, description, duration, year, author, channel, trailer, url]);
    if (postProject.rows.length  <  1)  {
      res.status(404).json({message:  "project not create"});
      return

    }

    res.status(200).json(postProject.rows[0]);

  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}


const deleteProject  = async(req: any, res: any)  =>  {
  try {

    const { id  }  = req.params;

    if (id  ==  0)   {
      res.status(404).json({message: "id not be a 0"});
      return
    }

    const deleteProject  = await pool.query('DELETE FROM project WHERE id  =  $1 RETURNING  *',  [id]);

    if (deleteProject.rows.length  <  1)   {
      res.status(404).json({message:   "Project not delete"});
      return
    }

  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}


const updateProject = async(req: any, res: any)   =>   {
  try {

    const { id, title, description, duration, year, author, channel, trailer  }  = req.body;

    if (!req.file) {
      res.status(404).json({message: "No image file"});
      return
    }

    const idProject = uuid()
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host;
    const url = protocol + '://' + host + '/image/project/' + `project_${idProject}.jpeg`;


    const inputPath = path.join(__dirname, '../../public/image/project', req.file.originalname)
    const outputPath = path.join(__dirname, '../../public/image/project', `project_${idProject}.jpeg`)

    await sharp(inputPath).png({quality: 90}).resize(540, 304).toFile(outputPath)
    fs.unlinkSync(inputPath)


    const updateProject  = await pool.query('UPDATE project SET title = $1, description = $2, duration = $3, year  =  $4, author  =  $5, channel = $6, trailer = $7, image = $8 WHERE id = $9', [title, description, duration, year, author, channel, trailer, url, id])


    if (!updateProject)   {
      res.status(404).json({message: "Карточка проекта не изменена"});
      return
    }

    console.log(updateProject.rows[0]);
    res.status(200).json(updateProject.rows[0]);

  } catch (error) {
    console.log(error);

  }
}


export { getProjects, getOneProject, postProject, deleteProject, updateProject }