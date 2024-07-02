import express from 'express';
import cors from 'cors';
import bodyParser from  'body-parser';
import cookieParser from 'cookie-parser'
import dotenv from  'dotenv'
import path  from  'path';

// module

import loginRouter from './Router/loginRouter';
import teamRouter from './Router/teamRouter';

// middleware

import authMiddleware from './middleware/authMiddleware';


const publicPath  =  path.join(__dirname, '..',  'public');
console.log(publicPath + '/js')







const app = express();
dotenv.config()
const pid = process.pid



// use

app.use(express.static("public"));
app.use(express.static(publicPath + "/js"))
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// use routes

app.use('/api/v1', loginRouter)
app.use('/api/v1', teamRouter)



//


app.get('/login', (req, res) => {
  try {
    res.status(200).sendFile(publicPath   +   '/html/login.html')
  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }
})


app.get('/', (req, res) => {
  try {
    res.redirect('/login')
  } catch (error) {
    console.error(error)
    res.status(400).sendFile('/404.html')
  }
})


app.get('/main', authMiddleware, (req, res) => {
  try  {

    res.status(200).sendFile(publicPath  +  '/html/main.html')
   } catch  (error)  {
    console.error(error)
    res.status(400).sendFile('404.html')
   }

})



app.get('/main/team', authMiddleware, (req, res) => {
  try {

    res.status(200).sendFile(publicPath  +  '/html/teamPage.html')

  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }
})



app.get('/team/:id', (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/teamCard.html')

  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }

})



app.get('/*', (req, res) => {
  try  {
    if(req.cookies.token) {
      res.redirect('/main')
      return
    }
    res.redirect('/login')

  } catch  (error)  {
   res.status(400).sendFile('404.html')
  }

})





const PORT = process.env.PORT || 9000;

const startServer = () => {
  try {
    app.listen(PORT, ()  =>  console.log(`Сервер запущен на порту ${PORT}\nPID:${pid}`));
  } catch (error) {
    console.error(`Сервер запущен с ошибкой.\тКод ошибки: ${error}`);
  }
}

startServer()