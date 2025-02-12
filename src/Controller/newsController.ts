import { pool } from '../db/database';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';


//

import { logger } from '../util/logging';




const getNews = async (req: any, res: any) => {
  try {

    const allNews = await pool.query(`SELECT * FROM news`);
    if (allNews.rows.length < 1) {
      res.status(404).json({message: 'Not news'});
      return;
    }
    res.status(200).send(allNews.rows);

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}


const getSingleNews = async (req: any, res: any) => {
  try {

    const { id } = req.params;
    if(typeof id !== 'string') {
      res.status(400).send('Неверный формат id');
      return;
    }

    const singleNews = await pool.query(`SELECT * FROM news WHERE id = ${id}`)

    if (singleNews.rows.length < 1) {
      res.status(404).send('Новости с таким id не найдено');
      return;
    }

    res.status(200).send(singleNews.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}




const postNews = async (req: any, res: any) => {

  try {

    if (!req.files) {
      console.log('Нет файлов для загрузки.')
    }

    const idNews = uuid()

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host

    let findImage
    let endFolder

    if (!req.files.file_1) {
      findImage = req.files.title_image
      endFolder = path.parse(findImage[0].destination).base.split('\\').slice(-1)
    } else if(!req.files.title_image) {
      findImage = req.files.file_1
      endFolder = path.parse(findImage[0].destination).base.split('\\').slice(-1)
    } else {
      findImage = ''
      endFolder = ''
    }




    Object.values(req.files).forEach(async (item: any, index: any) => {
      const inputPath = path.join(__dirname, '../../public/image/news/' + endFolder + '/' + item[0].originalname)
      const outputPath = path.join(__dirname, '../../public/image/news/' + endFolder + '/' + `news_image_${idNews}_${index}.jpeg`)

      await sharp(item[0].path).jpeg({quality: 90}).resize(864).toFile(outputPath)

      fs.unlink(inputPath, (err) => {
        if(err) {
          console.log(`Ошибка удаления файла ${item[0].originalname} - ${err}`)
          return
        }
        console.log(`Файл удален ${item[0].originalname}`)
      })
    })


    const arrOfFiles = Object.values(req.files).map((item: any, index: any) => {
      return {
        ...item[0],
        originalname: `news_image_${idNews}_${index}.jpeg`
      }
    }).reduce((acc, item) => {
      acc[item.fieldname] = item
      return acc
    }, {})


     const url = protocol + '://' + host + '/image/news/' + (!endFolder) ? '' : endFolder[0] + '/'


    //

    const {title, lead, author, date, video, text_1, comment_1, image_comment_1, text_2, comment_2, image_comment_2, text_3, comment_3, image_comment_3, text_4, comment_4, image_comment_4, text_5, comment_5, image_comment_5, text_6, comment_6, image_comment_6, text_7, comment_7, image_comment_7, text_8, comment_8, image_comment_8, text_9, comment_9, image_comment_9, text_10, comment_10, image_comment_10, tags, views, news_description, title_comment} = req.body;

    const postNews = await pool.query(`INSERT INTO news (title, lead, author, date, video,  text_1, comment_1, image_1, image_comment_1, text_2, comment_2, image_2, image_comment_2, text_3, comment_3, image_3, image_comment_3, text_4, comment_4, image_4, image_comment_4, text_5, comment_5, image_5, image_comment_5, text_6, comment_6, image_6, image_comment_6, text_7, comment_7, image_7, image_comment_7, text_8, comment_8, image_8, image_comment_8, text_9, comment_9, image_9, image_comment_9, text_10, comment_10, image_10, image_comment_10, tags, views, news_description, title_image, title_comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50) RETURNING *`, [title, lead, author, date, video, text_1, comment_1, (req.files.file_1) ? url + arrOfFiles.file_1.originalname : '', image_comment_1, text_2, comment_2, (req.files.file_2) ? url + arrOfFiles.file_2.originalname : '', image_comment_2, text_3, comment_3, (req.files.file_3) ? url + arrOfFiles.file_3.originalname : '', image_comment_3, text_4, comment_4, (req.files.file_4) ? url + arrOfFiles.file_4.originalname : '', image_comment_4, text_5, comment_5, (req.files.file_5) ? url + arrOfFiles.file_5.originalname : '', image_comment_5, text_6, comment_6, (req.files.file_6) ? url + arrOfFiles.file_6.originalname : '', image_comment_6, text_7, comment_7, (req.files.file_7) ? url + arrOfFiles.file_7.originalname : '', image_comment_7, text_8, comment_8, (req.files.file_8) ? url + arrOfFiles.file_8.originalname : '', image_comment_8, text_9, comment_9, (req.files.file_9) ? url + arrOfFiles.file_9.originalname : '', image_comment_9, text_10, comment_10, (req.files.file_10) ? url + arrOfFiles.file_10.originalname : '', image_comment_10, tags, 0, news_description, (req.files.title_image) ? url + arrOfFiles.title_image.originalname : req.files.title_image, title_comment]);


    if(postNews.rows.length < 1) {
      res.status(404).send('Новости не созданы');
      return;
    }

    logger.info(`Новость создана - номер новости в папке ${idNews}`)
    res.status(200).send(postNews.rows[0]);

  } catch (error: string | any) {
    console.log(error);
    logger.error(`При добавлении новости произошла ошибка ${error.message}`)
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}




const updateNews = async (req:any, res:any) => {
  try {


    const idNews = uuid()

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host

    let findImage
    let endFolder

    if(!req.files) {

      console.log('Нет файлов для обновления')

      if (!req.files.file_1) {
        findImage = req.files.title_image
        endFolder = path.parse(findImage[0].destination).base.split('\\').slice(-1)[0]
      } else if(!req.files.title_image) {
        findImage = req.files.file_1
        endFolder =  path.parse(findImage[0].destination).base.split('\\').slice(-1)[0]
      } else {
        findImage = ''
        endFolder = ''
      }

    } else {
      findImage = ''
      endFolder = ''
    }





    Object.values(req.files).forEach(async (item: any, index: any) => {
      const inputPath = path.join(__dirname, '../../public/image/news/' + endFolder + '/' + item[0].originalname)
      const outputPath = path.join(__dirname, '../../public/image/news/' + endFolder + '/' + `news_image_${idNews}_${index}.jpeg`)

      await sharp(item[0].path).jpeg({quality: 90}).resize(864).toFile(outputPath)

      fs.unlink(inputPath, (err) => {
        if(err) {
          console.log(`Ошибка удаления файла ${item[0].originalname} - ${err}`)
          return
        }
        console.log(`Файл удален ${item[0].originalname}`)
      })
    })


    const arrOfFiles = Object.values(req.files).map((item: any, index: any) => {
      return {
        ...item[0],
        originalname: `news_image_${idNews}_${index}.jpeg`
      }
    }).reduce((acc, item) => {
      acc[item.fieldname] = item
      return acc
    }, {})


     const url = protocol + '://' + host + '/image/news/' + (endFolder === '') ? '' : endFolder + '/'


    //


    const {id, title, lead, author, date, video, text_1, image_comment_1, comment_1, text_2, image_comment_2, comment_2, text_3, image_comment_3, comment_3, text_4, image_comment_4, comment_4, text_5, image_comment_5, comment_5, text_6, image_comment_6, comment_6, text_7, image_comment_7, comment_7, text_8, image_comment_8, comment_8, text_9, image_comment_9, comment_9, text_10, image_comment_10, comment_10, tags, views, news_description, title_image, title_comment} = req.body;


    const updateNews = await pool.query(`UPDATE news SET title = $1, lead = $2, author = $3, date = $4, video = $5,  text_1 = $6, comment_1 = $7, image_1 = $8, image_comment_1 = $9, text_2 = $10, comment_2 = $11, image_2 = $12, image_comment_2 = $13, text_3 = $14, comment_3 = $15, image_3 = $16, image_comment_3 = $17, text_4 = $18, comment_4 = $19, image_4 = $20, image_comment_4 = $21, text_5 = $22, comment_5 = $23, image_5 = $24, image_comment_5 = $25, text_6 = $26, comment_6 = $27, image_6 = $28, image_comment_6 = $29, text_7 = $30, comment_7 = $31, image_7 = $32, image_comment_7 = $33, text_8 = $34, comment_8 = $35, image_8 = $36, image_comment_8 = $37, text_9 = $38, comment_9 = $39, image_9 = $40, image_comment_9 = $41, text_10 = $42, comment_10 = $43, image_10 = $44, image_comment_10 = $45, tags = $46, views = $47, news_description = $48, title_image = $49, title_comment = $50 WHERE id = $51`, [title, lead, author, date, video, text_1, comment_1, (req.files.file_1) ? url + arrOfFiles.file_1.originalname : req.body.file_1, image_comment_1, text_2, comment_2, (req.files.file_2) ? url + arrOfFiles.file_2.originalname : req.body.file_2, image_comment_2, text_3, comment_3, (req.files.file_3) ? url + arrOfFiles.file_3.originalname : req.body.file_3, image_comment_3, text_4, comment_4, (req.files.file_4) ? url + arrOfFiles.file_4.originalname : req.body.file_4, image_comment_4, text_5, comment_5, (req.files.file_5) ? url + arrOfFiles.file_5.originalname : req.body.file_5, image_comment_5, text_6, comment_6, (req.files.file_6) ? url + arrOfFiles.file_6.originalname : req.body.file_6, image_comment_6, text_7, comment_7, (req.files.file_7) ? url + arrOfFiles.file_7.originalname : req.body.file_7, image_comment_7, text_8, comment_8, (req.files.file_8) ? url + arrOfFiles.file_8.originalname : req.body.file_8, image_comment_8, text_9, comment_9, (req.files.file_9) ? url + arrOfFiles.file_9.originalname : req.body.file_9, image_comment_9, text_10, comment_10, (req.files.file_10) ? url + arrOfFiles.file_10.originalname : req.body.file_10, image_comment_10, tags, 0, news_description, (req.files.title_image) ? url + arrOfFiles.title_image.originalname : req.files.title_image, title_comment, id])

    if(!updateNews.rows) {
      res.status(404).send('Новости не созданы');
      return;
    }
    logger.info(`Новость обновлена - номер новости в папке ${idNews}`)
    res.status(200).send(updateNews.rows[0]);

  } catch (error: string | any) {
    console.log(error);
    logger.error(`При обновлении новости произошла ошибка ${error.message}`)
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}




const deleteNews = async (req: any, res: any) => {
  try {

    const { id } = req.params;

    const deleteNews = await pool.query(`DELETE FROM news WHERE id = $1 RETURNING *`, [id]);
    logger.info(`Новость удалена - номер новости в папке ${id}`)
    res.status(200).send(deleteNews.rows[0]);

  } catch (error: string | any) {
    console.log(error);
    logger.error(`При удалении новости произошла ошибка ${error.message}`)
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }

}

// update views

const updateViews = async (req: any, res: any) => {
  try {


    const { id, views } = req.body;
    console.log(id);

    const newViews = 1

    const updateViews = await pool.query(`UPDATE news SET views = views + $1 WHERE id = $2 RETURNING *`, [newViews, id])

    if (updateViews.rows.length < 1) {
      res.status(404).send('Новости с таким id не найдено');
      return;
    }

    res.status(200).send(updateViews.rows[0]);


  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}



export { getNews, getSingleNews, postNews, updateNews, deleteNews, updateViews }