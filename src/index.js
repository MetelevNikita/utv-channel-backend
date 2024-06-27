import express from 'express';
import bodyParser from 'body-parser';
import cors from  'cors';
import dotenv from 'dotenv';
import path  from  'path';

// modules

import { errorHanlder } from '../middleware/errorHanlder.js';
import loginRouter from '../Routes/loginRouter.js';


//

dotenv.config();
const pid = process.pid;
const __dirname = path.resolve();

console.log(__dirname)


//

const app = express();

//

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/image', express.static('public/image'))


// use modules

app.use('/api/v1', loginRouter)



// routes




app.get('/login', (req, res) => {
  try {

    res.status(200).sendFile(path.join(__dirname, '/public/html/login.html'));

  } catch (error) {
    res.status(400).json({message: 'sdasdasds'})
  }
})


app.get('/*', (req, res) => {

  try {

    res.redirect('/login');

  } catch (error) {
    errorHanlder(error)

  }

})










// listen

const PORT = process.env.PORT || 9000;

const startServer = () => {
  try {
    app.listen(PORT, ()  =>  {console.log(`Сервер звапущен на порту: ${PORT} \nPID: ${pid}`)})
  } catch (error) {
    console.error(`Ошибка запуска сервера код ошибки: ${error}`);
  }
}


startServer();