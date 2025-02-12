// const url = 'https://utvchannel.tw1.su'
const url = 'http://localhost:9000'

//

const formCahangeTitle = document.getElementById("form-title");
const changeFormButton = document.getElementById("change_card_button");
const backFormButton = document.getElementById('select_team_btn')

const cardId = localStorage.getItem("cardId");


const teamName  = document.getElementById("team_name");
const teamProfession = document.getElementById("team_profession");
const teamFile = document.getElementById("team_file");


formCahangeTitle.innerHTML = `Создайте пользователя в команду ${cardId}`


const getSingleCard = async (id) => {
  try {
    const responce = await fetch(`${url}/api/v1/team/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await responce.json();
    teamName.value = data.name
    teamProfession.value  = data.profession

  } catch (error) {
    console.log(`Произошла ошибка ${error}`);
  }
}

const updateSingleCard = async  (e)  =>  {
  e.preventDefault()

  const updateFormData  = new FormData();

  updateFormData.append('id',  cardId);
  updateFormData.append('name',  teamName.value);
  updateFormData.append('profession',  teamProfession.value);
  updateFormData.append('file',  teamFile.files[0]);


  try {
    const responce = await fetch(`${url}/api/v1/team`, {
      method:  'PUT',
      body: updateFormData
    })
    const data = responce
    alert('Карточка пользователя успешно обновлена')
    window.location.href = '/main/team'
    return responce


  } catch (error) {
    console.log(`Произошла ошибка ${error}`);

  }
}

getSingleCard(cardId)



// Выход


changeFormButton.addEventListener("click",  updateSingleCard)
backFormButton.addEventListener("click",  () => {
  window.location.href = "/main/team"
})