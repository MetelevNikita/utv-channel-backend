const url  =  'https://utvchannel.tw1.su'





// submit to team page



const selectTeamBtn = document.getElementById('select_team_btn');

selectTeamBtn.addEventListener('click', async  (e)  =>  {
  e.preventDefault();

  try {

    window.location.href = 'main/team'

  } catch (error) {
    console.log(`произошла ошибка ${error}`)
  }
})


// team Form


const teamForm = document.getElementById('team_form');


teamForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {


    const teamName = document.getElementById('team_name');
    const teamProfession= document.getElementById('team_profession');
    const teamFile= document.getElementById('team_file');

    const newTeamForm = new FormData();

    newTeamForm.append('name', teamName.value);
    newTeamForm.append('profession', teamProfession.value);
    newTeamForm.append('file', teamFile.files[0]);


    const responce = await fetch(`${url}/api/v1/team`, {
      method: 'POST',
      body: newTeamForm
    })

    const data = responce
    teamForm.reset();
    alert('карточка сотрудника успешно создана')
    return data

  } catch (error) {
    console.log('при создании карточки произошла ошибка')
  }
})


// project form


const projectForm = document.getElementById('project_form');

projectForm.addEventListener('submit', async  (e)  =>  {
  e.preventDefault()

  try {


    const title = document.getElementById('project_title').value;
    const description  = document.getElementById('project_description').value;
    const duration = document.getElementById('project_duration').value;
    const year = document.getElementById('project_year').value;
    const author  = document.getElementById('project_author').value;
    const channel = document.getElementById('project_channel').value;
    const trailer = document.getElementById('project_trailer').value;

    const file = document.getElementById('project_file').files[0];


    const newProjectForm  = new FormData();

    newProjectForm.append('title', title);
    newProjectForm.append('description', description);
    newProjectForm.append('duration', duration);
    newProjectForm.append('year', year);
    newProjectForm.append('author', author);
    newProjectForm.append('channel', channel);
    newProjectForm.append('trailer', trailer);
    newProjectForm.append('file', file);



    const responce = await fetch(`${url}/api/v1/project`,  {
      method:  'POST',
      body: newProjectForm
    })

    const data = responce

    if (responce.status === 200) {
      projectForm.reset();
      alert('карточка проекта успешно создана')
      return data

    }


  } catch (error) {
    console.log(`произошла ошибка  ${error}`)
  }
})


// submit to project page

const selectProjectBtn = document.getElementById('select_project_btn')

selectProjectBtn.addEventListener('click', async  (e)  =>  {
  e.preventDefault()

  try {

    window.location.href ='main/project'

  } catch (error) {
    console.log(`произошла ошибка ${error}`)
  }
})


// NEWS


const date = document.getElementById('news_date')
date.valueAsDate = new Date()





const setNameAuthor = async () => {

  const author = document.getElementById('news_author')
  const userId = document.cookie.split(' ')[3].split('=')[1]
  console.log(userId)

  try {
    const responce = await fetch(`${url}/api/v1/login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if(responce.ok) {
      const data = await responce.json();


      const singleUser = data.find((item) => item.id == userId)
      return author.value = singleUser.username
    }

  } catch (error) {
    console.log(error)
  }
}
setNameAuthor()




// text toolbar


const textStyle = ['none', 'underline', 'underline dotted', 'green wavy underline']
const fontStyle = ['normal','italic']
const fontBold = ['bold', 'regular', 'thin']


const textStyleSelect = document.createElement('select')
textStyleSelect.setAttribute('id', 'text_style')
textStyleSelect.setAttribute('class', 'select_style')
for (let i = 0; i < textStyle.length; i++) {
  const option = document.createElement('option')
  option.value = textStyle[i]
  option.textContent = textStyle[i]
  textStyleSelect.appendChild(option)
}

const fontStyleSelect = document.createElement('select')
fontStyleSelect.setAttribute('id', 'font_style')
fontStyleSelect.setAttribute('class', 'select_style')
for (let i = 0; i < fontStyle.length; i++) {
  const option = document.createElement('option')
  option.value = fontStyle[i]
  option.textContent = fontStyle[i]
  fontStyleSelect.appendChild(option)
}

const fontBoldSelect = document.createElement('select')
fontBoldSelect.setAttribute('id', 'text_style')
fontBoldSelect.setAttribute('class', 'select_style')
for (let i = 0; i < fontBold.length; i++) {
  const option = document.createElement('option')
  option.value = fontBold[i]
  option.textContent = fontBold[i]
  fontBoldSelect.appendChild(option)

}





// news form


const tagBox = document.getElementById('tag_news_box')

// news categorySelector


const categoryArr = ['Все', 'Политика', 'Экономика', 'Общество', 'Мир', 'Криминал', 'Cпорт', 'Технологии', 'Здоровье', 'Культура', 'Искуство']
const selectedTags = []


const newsCategory = document.getElementById('news_category');
const newsCategoryBox = document.getElementById('news_category_box')

for (let i = 0; i < categoryArr.length; i++) {
  const option = document.createElement('option')
  option.value = categoryArr[i]
  option.textContent = categoryArr[i]
  newsCategory.append(option)
}

newsCategory.addEventListener('change', (e) => {
  selectedTags.push(e.target.value)

  const tag = document.createElement('div')
  tag.setAttribute('id', 'news_tag')
  tag.setAttribute('class', 'news_tag md-2')
  tag.textContent = e.target.value
  tagBox.appendChild(tag)

})




const arrArea = []

const newsTextArea = document.createElement('textarea')
newsTextArea.setAttribute('id', `news_text_${arrArea.length + 1}`);
newsTextArea.setAttribute('placeholder', 'Введите текст новости');
newsTextArea.setAttribute('rows', '6')
newsTextArea.setAttribute('name', 'news_text_area');
newsTextArea.setAttribute('class', 'input_area input_news_description')




const newsForm = document.getElementById('news_form');

let textNum = 1
let textArr = []
let fileNum = 1
let fileArr = []
let commentFile = 1
let commentFileArr = []
let commentNum = 1
let commentArr = []


const btnNewsText = document.getElementById('btn_news_text');
const btnNewsFile = document.getElementById('btn_news_file');
const btnNewsComment = document.getElementById('btn_news_comment')
const btnNewsBox = document.getElementById('btn_news_box');
const submitNewsBtn = document.getElementById('login_news_button')







btnNewsText.addEventListener('click', (e)  =>  {

  e.preventDefault()

  if(textArr.length >= 10) {
    alert('Максимальное количество новостей 10')
    return
  }

  const newText = textNum++

  const textAreaBox = document.createElement('div')
  textAreaBox.setAttribute('id', `text_area_box_${newText}`);
  textAreaBox.setAttribute('class', 'text_area_box')

  const closeButton = document.createElement('div')
  closeButton.setAttribute('class', 'close-btn')
  closeButton.setAttribute('id', 'close-button')
  closeButton.textContent = 'x'


  const newsTextArea = document.createElement('textarea')
  newsTextArea.setAttribute('id', `news_text_${newText}`);
  newsTextArea.setAttribute('placeholder', 'Введите текст новости');
  newsTextArea.setAttribute('rows', '6')
  newsTextArea.setAttribute('name', 'news_text_area');
  newsTextArea.setAttribute('class', 'input_area input_news_description')

  textAreaBox.appendChild(newsTextArea)
  textAreaBox.appendChild(closeButton)


  btnNewsBox.insertAdjacentElement('beforebegin', textAreaBox)

  textArr.push(newsTextArea)

  closeButton.addEventListener('click', (e)  =>  {
      textArr = textArr.filter((item) => {
        textAreaBox.remove()
        return item.id !== `news_text_${e.target.parentNode.id.slice(14)}`
      })
      return textArr
  })


})

btnNewsFile.addEventListener('click',  (e)  =>  {
  e.preventDefault()

  if(fileArr.length >= 10) {
    alert('Максимальное количество новостей 10')
    return
  }

  const newFileNum = fileNum++

  const textAreaBox = document.createElement('div')
  textAreaBox.setAttribute('id', `text_area_box_${newFileNum}`);
  textAreaBox.setAttribute('class', 'text_area_box_file')

  const closeButton = document.createElement('div')
  closeButton.setAttribute('class', 'close-btn-file')
  closeButton.setAttribute('id', 'close-button')
  closeButton.textContent = 'x'


  const textAreaSubBox = document.createElement('div')
  textAreaSubBox.setAttribute('id', `text_area_sub_box_file_${newFileNum}`);
  textAreaSubBox.setAttribute('class', 'text_area_sub_box_file')

  const imgComment = document.createElement('input')
  imgComment.setAttribute('type', 'text')
  imgComment.setAttribute('id', `img_comment_${newFileNum}`)
  imgComment.setAttribute('class', 'input_form input_news_comment_file')


  const newsFile = document.createElement('input')
  newsFile.setAttribute('type', 'file')
  newsFile.setAttribute('id', `news_file_${newFileNum}`)
  newsFile.setAttribute('name', `file_${newFileNum}`)
  newsFile.setAttribute('class', 'input_file d-flex mt-2 mb-4')
  newsFile.setAttribute('text', `загрузите изображение ${newFileNum}`)
  newsFile.setAttribute('required', 'required')

  textAreaSubBox.appendChild(newsFile)
  textAreaSubBox.appendChild(imgComment)


  textAreaBox.appendChild(textAreaSubBox)
  textAreaBox.appendChild(closeButton)




  btnNewsBox.insertAdjacentElement('beforebegin', textAreaBox)

  fileArr.push(newsFile)
  commentFileArr.push(imgComment)

  closeButton.addEventListener('click', (e)  =>  {

    fileArr = fileArr.filter((item) => {
      return item.id !== `news_file_${e.target.parentNode.id.slice(14)}`
    })

    commentFileArr = commentFileArr.filter((item) => {
      return item.id !== `img_comment_${e.target.parentNode.id.slice(14)}`
    })

    textAreaBox.remove()

    return fileArr
  })


})

btnNewsComment.addEventListener('click', (e) => {

  e.preventDefault()

  if(commentArr.length >= 10) {
    alert('Максимальное количество новостей 10')
    return
  }

  const newComment = textNum++
  const textAreaBox = document.createElement('div')
  textAreaBox.setAttribute('id', `text_area_box_${newComment}`);
  textAreaBox.setAttribute('class', 'text_area_box')


  const closeButton = document.createElement('div')
  closeButton.setAttribute('class', 'close-btn')
  closeButton.setAttribute('id', 'close-button')
  closeButton.textContent = 'x'


  const newCommentDiv = document.createElement('div')
  newCommentDiv.setAttribute('id', 'news_comment_div')
  newCommentDiv.setAttribute('class', 'news_comment_div')
  const newsComment = document.createElement('textarea')
  newsComment.setAttribute('type', 'text')
  newsComment.setAttribute('id', `news_comment_${newComment}`)
  newsComment.setAttribute('class', 'input_area')
  newsComment.setAttribute('placeholder', 'Введите комментарий')
  newsComment.setAttribute('name', `comment_${newComment}`)
  newsComment.setAttribute('cols', 4)
  newsComment.setAttribute('rows', 8)





  newCommentDiv.appendChild(fontBoldSelect)
  newCommentDiv.appendChild(fontStyleSelect)
  newCommentDiv.appendChild(textStyleSelect)
  newCommentDiv.appendChild(newsComment)

  textAreaBox.appendChild(newCommentDiv)
  textAreaBox.appendChild(closeButton)


  btnNewsBox.insertAdjacentElement('beforebegin', textAreaBox)

  commentArr.push(newsComment)

  closeButton.addEventListener('click', (e)  =>  {
    commentArr = commentArr.filter((item) => {
      textAreaBox.remove()
      return item.id !== `news_comment_${e.target.parentNode.id.slice(14)}`
    })
    return commentArr
})

  return commentArr

})



newsForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {

    const newsTitle = document.getElementById('news_title').value;
    const newsLead = document.getElementById('news_lead').value;
    const newsAuthor = document.getElementById('news_author').value;
    const newsDate = document.getElementById('news_date').value;
    const newsVideo = document.getElementById('news_video').value
    const tags = selectedTags.join(' ')
    const views = 0




    const newNewsForm = new FormData();
    newNewsForm.append('title', newsTitle);
    newNewsForm.append('lead', newsLead)
    newNewsForm.append('author', newsAuthor);
    newNewsForm.append('date', newsDate);
    newNewsForm.append('video', newsVideo)
    newNewsForm.append('tags', tags);
    newNewsForm.append('views', views)


    if(textArr.length >= 1) {
      for (let i = 0; i < textArr.length; i++) {
        newNewsForm.append(`text_${i+1}`, textArr[i].value)
      }
    } else {
      console.log('нет текстов')
    }


    if(fileArr.length >= 1) {
      for (let i = 0; i < fileArr.length; i++) {
        newNewsForm.append(`file_${i+1}`, fileArr[i].files[0])
      }

    } else {
      console.log('нет файлов')
    }


    if (commentFileArr.length >= 1) {
      for (let i = 0; i < commentFileArr.length; i++) {
        console.log(commentFileArr[i].value)
        newNewsForm.append(`image_comment_${i+1}`, commentFileArr[i].value)
      }
    } else {
      console.log('нет комментариев к фото')
    }




    if(commentArr.length >= 1) {
      for (let i = 0; i < commentArr.length; i++) {

        const newObj = JSON.stringify({
          input: commentArr[i].value,
          fontStyle: fontStyleSelect.value,
          textStyle: textStyleSelect.value,
          fontBold: fontBoldSelect.value
        })

        newNewsForm.append(`comment_${i+1}`, newObj)
      }
    } else {
      console.log('нет комментариев')
    }

    console.log(...newNewsForm)

    const responce = await fetch(`${url}/api/v1/news`, {
      method: 'POST',
      body: newNewsForm
    })


      const data = responce

      if (responce.status === 200) {
        newsForm.reset();
        alert('карточка проекта успешно создана')
        return data

      }

  } catch (error) {
    console.log('произошла ошибка' + error)
  }
})


// submit to news page






const selectNewsBtn = document.getElementById('select_news_btn')

selectNewsBtn.addEventListener('click', () => {

  try {
    window.location.href ='main/news'
  } catch (error) {
    console.error(error)
  }

})





// program form

const programForm = document.getElementById('program_form')

programForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {

    const programDate = document.getElementById('program_date').value
    const programTitle = document.getElementById('program_title').value;
    const programSubtitle = document.getElementById('program_subtitle').value;
    const programDescription = document.getElementById('program_description').value
    const programLink = document.getElementById('program_link').value
    const programFile = document.getElementById('program_file').files[0]



    const programData = new FormData()
    programData.append('date', programDate)
    programData.append('title', programTitle)
    programData.append('subtitle', programSubtitle)
    programData.append('description', programDescription)
    programData.append('link', programLink)
    programData.append('file', programFile)


    const responce = await fetch(`${url}/api/v1/program`, {
      method: 'POST',
      body: programData
    })

    if (responce.status === 200) {
      programForm.reset();
      alert('программа успешно создана')
      return responce
    }

  } catch (error) {
    alert('Что то пошло не так при запросе')
    console.log(error)
  }
})



// submit to prgram page

const selectProgramBtn = document.getElementById('select_program_btn');

selectProgramBtn.addEventListener('click', async  (e)  =>  {
  e.preventDefault();

  window.location.href = 'main/program'

  try {

  } catch (error) {
    console.log(`произошла ошибка ${error}`)
  }
})



// submit epg file


const epgForm = document.getElementById('tv_form')


epgForm.addEventListener('submit', async (e) => {

  e.preventDefault()
  try {


    const file = document.getElementById('tv_file').files[0]

    const formData = new FormData()
    formData.append('file', file);


    const responce = await fetch(`${url}/api/v1/epg`, {
      method: 'POST',
      body: formData
    })


    if(responce.ok) {

      const data = responce.json()
      alert('Файл успешно загружен')
      formData.reset()
      return data
    }

  } catch (error) {
    console.log(error)
  }
})




