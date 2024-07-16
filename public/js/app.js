


// submit to team page

const selectTeamBtn = document.getElementById('select_team_btn');

selectTeamBtn.addEventListener('click', async  (e)  =>  {
  e.preventDefault();

  window.location.href = 'main/team'

  try {

  } catch (error) {
    console.log(`произошла ошибка ${error}`)
  }
})





// team Form


const teamUrl = 'http://localhost:9000/api/v1/team'
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


    const responce = await fetch(teamUrl, {
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


const projectUrl  =  'http://localhost:9000/api/v1/project'
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



    const responce = await fetch(projectUrl,  {
      method:  'POST',
      body: newProjectForm
    })

    const data = responce

    if (responce.status === 200) {
      projectForm.reset();
      console.log(data)
      alert('карточка проекта успешно создана')
      return data

    }


  } catch (error) {
    console.log(`произошла ошибка  ${error}`)
  }
})



// text toolbar


const textStyle = ['underline', 'underline dotted', 'green wavy underline']
const fontStyle = ['normal','italic', 'cursive', 'italic']
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


const categoryArr = ['Все новости', 'Политика', 'Экономика', 'Общество', 'В мире', 'Криминал', 'Cпорт', 'Технологии', 'Здоровье', 'Культура', 'Искуство']
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
let commentNum = 1
let commentArr = []


const btnNewsText = document.getElementById('btn_news_text');
const btnNewsFile = document.getElementById('btn_news_file');
const btnNewsComment = document.getElementById('btn_news_comment')
const btnNewsBox = document.getElementById('btn_news_box');
const submitNewsBtn = document.getElementById('login_news_button')


btnNewsText.addEventListener('click', (e)  =>  {

  e.preventDefault()

  const newText = textNum++
  const newsTextArea = document.createElement('textarea')
  newsTextArea.setAttribute('id', `news_text_${newText}`);
  newsTextArea.setAttribute('placeholder', 'Введите текст новости');
  newsTextArea.setAttribute('rows', '6')
  newsTextArea.setAttribute('name', 'news_text_area');
  newsTextArea.setAttribute('class', 'input_area input_news_description')

  btnNewsBox.insertAdjacentElement('beforebegin', newsTextArea)
  return textArr.push(newsTextArea)

})


btnNewsFile.addEventListener('click',  (e)  =>  {
  e.preventDefault()


  const newFileNum = fileNum++
  const newsFile = document.createElement('input')
  newsFile.setAttribute('type', 'file')
  newsFile.setAttribute('id', `news_file_${newFileNum}`)
  newsFile.setAttribute('name', `file_${newFileNum}`)
  newsFile.setAttribute('class', 'input_file d-flex mt-2 mb-4')
  newsFile.setAttribute('text', `загрузите изображение ${newFileNum}`)
  newsFile.setAttribute('required', 'required')
  console.log(newsFile)


  btnNewsBox.insertAdjacentElement('beforebegin', newsFile)
  return fileArr.push(newsFile)


})


btnNewsComment.addEventListener('click', (e) => {

  e.preventDefault()

  const newComment = commentNum++

  const newCommentDiv = document.createElement('div')
  newCommentDiv.setAttribute('id', 'news_comment_div')
  newCommentDiv.setAttribute('class', 'news_comment_div')
  const newsComment = document.createElement('input')
  newsComment.setAttribute('type', 'text')
  newsComment.setAttribute('id', `news_comment_${newComment}`)
  newsComment.setAttribute('class', 'input_form')
  newsComment.setAttribute('placeholder', 'Введите комментарий')
  newsComment.setAttribute('name', `comment_${newComment}`)


  newCommentDiv.appendChild(fontBoldSelect)
  newCommentDiv.appendChild(fontStyleSelect)
  newCommentDiv.appendChild(textStyleSelect)
  newCommentDiv.appendChild(newsComment)


  btnNewsBox.insertAdjacentElement('beforebegin', newCommentDiv)
  return commentArr.push(newsComment)

})





const newsUrl  =  'http://localhost:9000/api/v1/news'


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
      console.log('есть тексты')
      for (let i = 0; i < textArr.length; i++) {
        newNewsForm.append(`text_${i+1}`, textArr[i].value)
      }
    } else {
      console.log('нет текстов')
    }


    if(fileArr.length >= 1) {
      console.log('есть файлы')
      for (let i = 0; i < fileArr.length; i++) {
        newNewsForm.append(`file_${i+1}`, fileArr[i].files[0])
      }

    } else {
      console.log('нет файлов')
    }


    if(commentArr.length >= 1) {
      console.log('есть комментарии')
      for (let i = 0; i < commentArr.length; i++) {

        const newObj = JSON.stringify({
          input: commentArr[i].value,
          fontStyle: fontStyleSelect.value,
          textStyle: textStyleSelect.value,
          fontBold: fontBoldSelect.value
        })

        console.log(newObj)
        newNewsForm.append(`comment_${i+1}`, newObj)
      }
    } else {
      console.log('нет комментариев')
    }



      const responce = await fetch(newsUrl, {
        method: 'POST',
        body: newNewsForm
      })


      const data = responce

      if (responce.status === 200) {
        newsForm.reset();
        console.log(data)
        alert('карточка проекта успешно создана')
        return data

      }





  } catch (error) {
    console.log('произошла ошибка' + error)
  }
})








