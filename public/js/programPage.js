
const url  =  'https://utvchannel.tw1.su'

//

const containerCard = document.getElementById('cards_container');

const emptyList = document.createElement('div')
emptyList.setAttribute('id', 'empty_list');
emptyList.setAttribute('class', 'empty_list d-flex')
emptyList.textContent = 'Нет программ'


const getAllProgramCard = async () => {
  try {


    const responce = await fetch(`${url}/api/v1/program`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }

    })

    const data = await responce.json();
    const programCards = (data.message === 'Список программ пуст') ?  containerCard.appendChild(emptyList) : data.map((item) => {


      const cardProgram = document.createElement('div');
      cardProgram.setAttribute('class', 'card_program');
      cardProgram.setAttribute('id', 'card_program');


      const titleProgram = document.createElement('div');
      titleProgram.setAttribute('class', 'title_program mb-4');
      titleProgram.textContent = item.title;

      const imgProgram = document.createElement('img');
      imgProgram.setAttribute('class', 'img_program mb-4')
      imgProgram.setAttribute('src', item.image)
      imgProgram.setAttribute('alt', 'img');


      const btnBoxProgram = document.createElement('div')
      btnBoxProgram.setAttribute('class', 'btn_box_program')
      btnBoxProgram.setAttribute('id', 'btn_box_news')


      const btnProgramDelete = document.createElement('button');
      btnProgramDelete.setAttribute('class', 'btn_program btn_program_delete');
      btnProgramDelete.setAttribute('id', 'btn_program_delete');
      btnProgramDelete.textContent = 'Удалить';


      btnProgramDelete.addEventListener('click', async () => {
        const responce = await fetch(`${url}/api/v1/program/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        const data = await responce.json();
        console.log(data);
        cardProgram.remove()
        window.location.reload();
        return data
      })



      const btnProgramUpdate = document.createElement('button');
      btnProgramUpdate.setAttribute('class', 'btn_program btn_program_update');
      btnProgramUpdate.setAttribute('id', 'btn_program_update');
      btnProgramUpdate.textContent = 'Изменить';


      btnProgramUpdate.addEventListener('click', () => {
        localStorage.setItem('programId', item.id)
        window.location.href = `/program/${item.id}`
      })

      cardProgram.appendChild(imgProgram);
      cardProgram.appendChild(titleProgram);
      cardProgram.appendChild(btnBoxProgram);
      btnBoxProgram.appendChild(btnProgramDelete);
      btnBoxProgram.appendChild(btnProgramUpdate);


      containerCard.appendChild(cardProgram);
    })


  } catch (error) {
    console.error(error);

  }
}


getAllProgramCard()



const backBtn = document.getElementById('select_program_back_btn');

backBtn.addEventListener('click', () => {
  try {
    window.location.href = '/main';
  } catch (error) {
    console.error(error);
  }
})