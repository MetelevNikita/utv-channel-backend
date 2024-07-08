// submit to team page

const selectTeamBtn = document.getElementById('select_team_btn');
console.log(selectTeamBtn);

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
console.log(projectForm);



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

