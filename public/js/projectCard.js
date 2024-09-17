const url  =  'https://utvchannel.tw1.su'

//

const projectId = localStorage.getItem('projectId');
const projectUpdateForm = document.getElementById('project-update_form')
const changeFomtBtn = document.getElementById('select_project_back_btn')


const getSingleCard = async () => {
  try {
    const responce = await fetch(`${url}/api/v1/project/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })


    const data = await responce.json();


    const projectTitle = document.getElementById('project_title').value = data.title;
    const projectDescription = document.getElementById('project_description').value = data.description;
    const projectDuration = document.getElementById('project_duration').value = data.duration;
    const projectYear = document.getElementById('project_year').value = data.year;
    const projectAuthor = document.getElementById('project_author').value = data.author;
    const projectChannel = document.getElementById('project_channel').value = data.channel;
    const projectTrailer = document.getElementById('project_trailer').value = data.trailer;


  } catch (error) {
    console.log(`Запрос на получение карты проекты вернулся с ошибкой. код ошибки ${error.code}`);
  }
}


projectUpdateForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {


    const projectTitle = document.getElementById('project_title');
    const projectDescription = document.getElementById('project_description');
    const projectDuration = document.getElementById('project_duration');
    const projectYear = document.getElementById('project_year');
    const projectAuthor = document.getElementById('project_author');
    const projectChannel = document.getElementById('project_channel');
    const projectTrailer = document.getElementById('project_trailer');
    const projectImage = document.getElementById('project_file').files[0];



    const newFormData = new FormData();


    newFormData.append('id', projectId);
    newFormData.append('title', projectTitle.value);
    newFormData.append('description', projectDescription.value);
    newFormData.append('duration', projectDuration.value);
    newFormData.append('year', projectYear.value);
    newFormData.append('author', projectAuthor.value);
    newFormData.append('channel', projectChannel.value);
    newFormData.append('trailer', projectTrailer.value);
    newFormData.append('file', projectImage);


    const responce = await fetch(`${url}/api/v1/project`, {
      method: 'PUT',
      body: newFormData
    })


    const data = await responce;
    projectUpdateForm.reset();
    return data;


  } catch (error) {
    console.log(`Запрос на обновление карты проекта вернулся с ошибкой. код ошибки ${error}`);
  }
})



getSingleCard()




//


changeFomtBtn.addEventListener('click', (e) => {
  e.preventDefault()

  try {

    window.location = '/main/project'

  } catch (error) {
    console.log(`Произошла ошибка перехода ${error}`)
  }
})






