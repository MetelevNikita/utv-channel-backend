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


    const teamName = document.getElementById('team_name').value;
    const teamProfession= document.getElementById('team_profession').value;
    const teamFile= document.getElementById('team_file').files[0];


    console.log(teamName);
    console.log(teamProfession);
    console.log(teamFile);


    const newTeamForm = new FormData();

    newTeamForm.append('name', teamName);
    newTeamForm.append('profession', teamProfession);
    newTeamForm.append('file', teamFile);


    const responce = await fetch(teamUrl, {
      method: 'POST',
      body: newTeamForm
    })

    const data = responce
    console.log(data)
    return data



  } catch (error) {
    console.log('при создании карточки произошла ошибка')
  }
})


