import express from 'express';
import cors from 'cors';
import bodyParser from  'body-parser';
import cookieParser from 'cookie-parser'
import dotenv from  'dotenv'
import path  from  'path';
import helmet from 'helmet';
import morgan from 'morgan'
import fs from 'fs';

// module

import loginRouter from './Router/loginRouter';
import teamRouter from './Router/teamRouter';
import projectRouter from './Router/projectRouter';
import newsRouter from './Router/newsRouter';
import programRouter from './Router/programRouter';
import epgRouter from './Router/epgRouter';

// middleware

import authMiddleware from './middleware/authMiddleware';
import { newsFolderNews } from './util/newsFolderDay';



const publicPath  =  path.join(__dirname, '..',  'public');
console.log(publicPath + '/js')


const app = express();
dotenv.config()
const pid = process.pid
const date = new Date();
const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

console.log(`PID:${pid}`)

newsFolderNews(day)





// use

app.use(express.static("public"));
app.use(express.static(publicPath + "/js"))
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));

// use routes

app.use('/api/v1', loginRouter)
app.use('/api/v1', teamRouter)
app.use('/api/v1', projectRouter)
app.use('/api/v1', newsRouter)
app.use('/api/v1', programRouter)
app.use('/api/v1', epgRouter)



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


// team

app.get('/main/team', authMiddleware, (req, res) => {
  try {

    res.status(200).sendFile(publicPath  +  '/html/teamPage.html')

  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }
})


app.get('/team/:id', authMiddleware, (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/teamCard.html')

  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }

})


// news

app.get('/main/news', authMiddleware, (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/newsPage.html')
  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }
})

app.get('/news/:id', authMiddleware, (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/newsCard.html')
  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }
})


// program

app.get('/main/program', (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/programPage.html')
  } catch (error) {
    console.error(error)
    res.status(400).sendFile(publicPath  +  '/html/404.html')
  }
})

app.get('/program/:id', (req, res) => {
  try {

    res.status(200).sendFile(publicPath  +  '/html/programCard.html')

  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }

})


// project

app.get('/main/project', authMiddleware, (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/projectPage.html')
  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }
})


app.get('/project/:id', authMiddleware, (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/projectCard.html')
  } catch (error) {
    console.error(error)
    res.status(400).sendFile('404.html')
  }

})



app.get('/news/test', authMiddleware, (req, res) => {
  try {
    res.status(200).sendFile(publicPath  +  '/html/TESTPAGE.html')
  } catch (error) {
    console.error(error)
  }
})



// other

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