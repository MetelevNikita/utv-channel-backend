import { pool } from '../db/database';
const date = new Date();
const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;


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

    const {title, lead, author, date, video, text_1, comment_1, text_2, comment_2, text_3, comment_3, text_4, comment_4, text_5, comment_5, text_6, comment_6, text_7, comment_7, text_8, comment_8, text_9, comment_9, text_10, comment_10, tags, views} = req.body;
    let fullUrl = req.protocol + '://' + req.get('host') + `/image/news/${day}/`;
    const postNews = await pool.query(`INSERT INTO news (title, lead, author, date, video,  text_1, comment_1, image_1, text_2, comment_2, image_2, text_3, comment_3, image_3, text_4, comment_4, image_4, text_5, comment_5, image_5, text_6, comment_6, image_6, text_7, comment_7, image_7, text_8, comment_8, image_8, text_9, comment_9, image_9, text_10, comment_10, image_10, tags, views) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37) RETURNING *`, [title, lead, author, date, video, text_1, comment_1, (req.files.file_1) ? fullUrl + req.files.file_1[0].originalname : '', text_2, comment_2, (req.files.file_2) ? fullUrl + req.files.file_2[0].originalname : '', text_3, comment_3, (req.files.file_3) ? fullUrl + req.files.file_3[0].originalname : '', text_4, comment_4, (req.files.file_4) ? fullUrl + req.files.file_4[0].originalname : '', text_5, comment_5, (req.files.file_5) ? fullUrl + req.files.file_5[0].originalname : '', text_6, comment_6, (req.files.file_6) ? fullUrl + req.files.file_6[0].originalname : '', text_7, comment_7, (req.files.file_7) ? fullUrl + req.files.file_7[0].originalname : '', text_8, comment_8, (req.files.file_8) ? fullUrl + req.files.file_8[0].originalname : '', text_9, comment_9, (req.files.file_9) ? fullUrl + req.files.file_9[0].originalname : '', text_10, comment_10, (req.files.file_10) ? fullUrl + req.files.file_10[0].originalname : '', tags, 0]);

    if(postNews.rows.length < 1) {
      res.status(404).send('Новости не созданы');
      return;
    }

    res.status(200).send(postNews.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}


const updateNews = async (req:any, res:any) => {
  try {

    const { id, title, lead, author, date, video, text_1, comment_1, text_2, comment_2, text_3, comment_3, text_4, comment_4, text_5, comment_5, text_6, comment_6, text_7, comment_7, text_8, comment_8, text_9, comment_9, text_10, comment_10, tags, views } = req.body;

    let fullUrl = req.protocol + '://' + req.get('host') + `/image/news/${day}/`;
    const updateNews = await pool.query(`UPDATE news SET (id, title, lead, author, date, video,  text_1, comment_1, image_1, text_2, comment_2, image_2, text_3, comment_3, image_3, text_4, comment_4, image_4, text_5, comment_5, image_5, text_6, comment_6, image_6, text_7, comment_7, image_7, text_8, comment_8, image_8, text_9, comment_9, image_9, text_10, comment_10, image_10, tags, views) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38) RETURNING *`, [id, title, lead, author, date, video, text_1, comment_1, (req.files.file_1) ? fullUrl + req.files.file_1[0].originalname : '', text_2, comment_2, (req.files.file_2) ? fullUrl + req.files.file_2[0].originalname : '', text_3, comment_3, (req.files.file_3) ? fullUrl + req.files.file_3[0].originalname : '', text_4, comment_4, (req.files.file_4) ? fullUrl + req.files.file_4[0].originalname : '', text_5, comment_5, (req.files.file_5) ? fullUrl + req.files.file_5[0].originalname : '', text_6, comment_6, (req.files.file_6) ? fullUrl + req.files.file_6[0].originalname : '', text_7, comment_7, (req.files.file_7) ? fullUrl + req.files.file_7[0].originalname : '', text_8, comment_8, (req.files.file_8) ? fullUrl + req.files.file_8[0].originalname : '', text_9, comment_9, (req.files.file_9) ? fullUrl + req.files.file_9[0].originalname : '', text_10, comment_10, (req.files.file_10) ? fullUrl + req.files.file_10[0].originalname : '', tags, 0]);

    if(updateNews.rows.length < 1) {
      res.status(404).send('Новости не созданы');
      return;
    }

    res.status(200).send(updateNews.rows[0]);


  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}


const deleteNews = async (req: any, res: any) => {
  try {

    const { id } = req.params;

    const deleteNews = await pool.query(`DELETE FROM news WHERE id = $1 RETURNING *`, [id]);
    res.status(200).send(deleteNews.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }

}



// update views

const updateViews = async (req: any, res: any) => {
  try {


    const { id } = req.body;
    console.log(id);

    const updateViews = await pool.query(`UPDATE news SET views = views + 1 WHERE id = $1 RETURNING *`, [id])

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