const cardsContainer = document.getElementById('cards_container');
const selectBackBtn = document.getElementById('select_team_back_btn')


const cardArr = []


const emptyTeamCard = () => {
  const emptyCard = document.createElement('div');
  emptyCard.classList.add('team_card_empty', 'col', 'd-flex', 'justify-content-center');
  emptyCard.innerHTML= 'Список пуст'

  return emptyCard;
}



const teamCard = (item) => {


  const teamBox = document.createElement('div');
  teamBox.classList.add('col-3', 'mb-4');

  const teamCardName =  document.createElement('div');
  teamCardName.classList.add('team_card_name');
  teamCardName.innerHTML = item.name;
  const teamCardProfession  =  document.createElement('div');
  teamCardProfession.classList.add('team_card_profession');
  teamCardProfession.innerHTML= item.profession;
  const teamCardImage  =  document.createElement('img');
  teamCardImage.classList.add('team_card_image');
  teamCardImage.setAttribute('src', item.image);


  const teamBtnBoxContainer =  document.createElement('div');
  teamBtnBoxContainer.classList.add('col', 'd-flex', 'flex-row', 'justify-content-between', 'mb-2', 'mt-2');



  const teamCardBtnDelete   =  document.createElement('button');
  teamCardBtnDelete.classList.add('team_card_btn');
  teamCardBtnDelete.setAttribute('id', 'teamDelBtn')
  teamCardBtnDelete.innerHTML  = 'Удалить';

  const teamCardBtnUpdate   =  document.createElement('button');
  teamCardBtnUpdate.classList.add('team_card_btn');
  teamCardBtnUpdate.setAttribute('id', 'teamDelUpdate')
  teamCardBtnUpdate.innerHTML  = 'Изменить';


  teamBtnBoxContainer.appendChild(teamCardBtnDelete)
  teamBtnBoxContainer.appendChild(teamCardBtnUpdate);



  teamBox.appendChild(teamCardImage);
  teamBox.appendChild(teamCardName);
  teamBox.appendChild(teamCardProfession);
  teamBox.appendChild(teamBtnBoxContainer);


  teamCardBtnDelete.addEventListener('click', ()  =>  {
    deleteCard(item.id);
    location.reload();
  })


  teamCardBtnUpdate.addEventListener('click', ()  =>  {
    console.log('update')
    localStorage.setItem('cardId', item.id);
    window.location.href =  `/team/${item.id}`;
  })



  return teamBox;

}


const getAllCards = async () => {
  const responce = await fetch('http://localhost:9000/api/v1/team', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await responce.json();
  console.log(data);

  if(data.length < 1) {
    return cardsContainer.appendChild(emptyTeamCard());
  }

  data.map((item) => {
    return cardsContainer.appendChild(teamCard(item));
  })
}


const deleteCard  =  async  (id)  =>  {
  const responce = await fetch(`http://localhost:9000/api/v1/team/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await responce.json();
  console.log(data);
  return data;

}


getAllCards()


selectBackBtn.addEventListener('click', ()  =>  {
  window.location.href = '/main';
})


