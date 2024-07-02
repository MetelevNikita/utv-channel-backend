const formCahangeTitle = document.getElementById("form-title");
const changeFormButton = document.getElementById("change_card_button");
const backFormButton = document.getElementById('select_team_btn')

console.log(changeFormButton)
const cardId = localStorage.getItem("cardId");
console.log(cardId);



const teamName  = document.getElementById("team_name");
const teamProfession = document.getElementById("team_profession");
const teamFile = document.getElementById("team_file");


formCahangeTitle.innerHTML = `Создайте пользователя в команду ${cardId}`


const getSingleCard = async (id) => {
  try {
    const responce = await fetch(`http://localhost:9000/api/v1/team/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await responce.json();
    console.log(data);
    teamName.value = data.name
    teamProfession.value  = data.profession

  } catch (error) {
    console.log(error);
  }
}

const updateSingleCard = async  (e)  =>  {

  e.preventDefault()

  const updateFormData  = new FormData();

  updateFormData.append('id',  cardId);
  updateFormData.append('name',  teamName.value);
  updateFormData.append('profession',  teamProfession.value);
  updateFormData.append('file',  teamFile.files[0]);

  console.log(teamFile.files[0])


  try {
    const responce = await fetch(`http://localhost:9000/api/v1/team`, {
      method:  'PUT',
      body: updateFormData
    })


    const data = responce
    console.log(data);
    return data

  } catch (error) {
    console.log(error);

  }
}

getSingleCard(cardId)


changeFormButton.addEventListener("click",  updateSingleCard)
backFormButton.addEventListener("click",  () => {
  window.location.href = "/main/team"
})