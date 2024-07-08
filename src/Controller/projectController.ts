
import { pool } from "../db/database";


const getProjects = async(req: any, res: any) => {
  try {


    const allprojects = await pool.query(`SELECT * FROM project`);

    if (allprojects.rows.length < 1) {
      res.status(404).json({message: "No projects found"});
      return
    }

    res.status(200).json(allprojects.rows);



  } catch (error: any) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
}



const getOneProject  = async(req: any, res: any)  =>  {
  try {

    const { id } = req.params;

    const sngleProject  = await pool.query('SELECT FROM project WHERE id = $1 RETURNING *', [id])

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



const postProject  = async(req: any, res: any)  =>  {
  try {

    const { title, description, duration, year, author, channel, trailer } = req.body;
    const imageFile = req.file.originalname;
    const fullUrl = req.protocol + '://' + req.get('host') + '/image/project/' + imageFile;

    const postProject = await pool.query('INSERT INTO project (title, description, duration, year, author, channel, trailer, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, description, duration, year, author, channel, trailer, fullUrl]);
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


const updateProject   = async(req: any, res: any)   =>   {
  try {


    const { id, title, description, duration, year, author, channel, trailer  }  = req.body;
    const imageFile = req.file.originalname;
    const fullUrl = req.protocol + '://' + req.get('host') + '/image/project/' + imageFile;

    const updateProject  = await pool.query('UPDATE project SET title = $1, description = $2, duration = $3, year  =  $4, author  =  $5, channel = $6, trailer = $7, image   =   $8 WHERE id = $9 RETURNING *', [title, description, duration, year, author, channel, trailer, fullUrl, id])

    if (updateProject.rows.length  <  1)   {
      res.status(404).json({message: "Project not update"});
      return
    }

    res.status(200).json(updateProject.rows[0]);

  } catch (error) {

  }
}


export { getProjects, getOneProject, postProject, deleteProject, updateProject }