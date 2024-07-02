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
console.log(teamForm);


teamForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {


    const teamName = document.getElementById('team_name');
    const teamProfession= document.getElementById('team_profession');
    const teamFile= document.getElementById('team_file');


    console.log(teamName);
    console.log(teamProfession);
    console.log(teamFile);


    const newTeamForm = new FormData();

    newTeamForm.append('name', teamName.value);
    newTeamForm.append('profession', teamProfession.value);
    newTeamForm.append('file', teamFile.files[0]);


    const responce = await fetch(teamUrl, {
      method: 'POST',
      body: newTeamForm
    })

    const data = responce
    console.log(data)


    teamForm.reset();
    alert('карточка сотрудника успешно создана')


    return data



  } catch (error) {
    console.log('при создании карточки произошла ошибка')
  }
})


