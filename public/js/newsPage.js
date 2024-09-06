const containerNews = document.getElementById('cards_container')



const cardNews = document.createElement('div')
cardNews.classList.add('card_news')
cardNews.setAttribute('id', 'card_news')


const titleNews = document.createElement('div')
titleNews.classList.add('title_news')
titleNews.setAttribute('id', 'title_news')


const btnBoxNews = document.createElement('div')
btnBoxNews.classList.add('btn_box_news')
btnBoxNews.setAttribute('id', 'btn_box_news')


const btnDelNews = document.createElement('button')
btnDelNews.classList.add('btn_del_news')
btnDelNews.setAttribute('id', 'btn_del_news')
btnDelNews.textContent = 'Удалить'

const btnUpdateNews = document.createElement('button')
btnUpdateNews.classList.add('btn_update_news')
btnUpdateNews.setAttribute('id', 'btn_update_news')
btnUpdateNews.textContent = 'Изменить'




const getAllNewsCard = async () => {

  const responce = await fetch('https://utvchannel.tw1.su/api/v1/news', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })


  const data = await responce.json()
  console.log(data)


  const filterDateNews = data.sort((a, b) => new Date(a.date) - new Date(b.date))
  console.log(filterDateNews)

  filterDateNews.map((news) => {

  const cardNews = document.createElement('div')
  cardNews.setAttribute('class', 'card_news d-flex flex-column mb-3')
  cardNews.setAttribute('id', 'card_news')




  const dateNews = document.createElement('div')
  dateNews.setAttribute('class', 'date_news d-flex mb-3')
  dateNews.setAttribute('id', 'date_news')
  dateNews.textContent = `Дата: ${news.date}`


  const titleNews = document.createElement('div')
  titleNews.setAttribute('class', 'title_news d-flex mb-3')
  titleNews.setAttribute('id', 'title_news')
  titleNews.textContent = news.title


  const btnBoxNews = document.createElement('div')
  btnBoxNews.setAttribute('class', 'btn_box_news d-flex mb-4')
  btnBoxNews.setAttribute('id', 'btn_box_news')


  const btnDelNews = document.createElement('button')
  btnDelNews.setAttribute('class', 'btn_card_news btn_del_news')
  btnDelNews.setAttribute('id', 'btn_del_news')
  btnDelNews.textContent = 'Удалить'


  btnDelNews.addEventListener('click', async () => {

    try {

      const responce = await fetch(`https://utvchannel.tw1.su/api/v1/news/${news.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await responce.json()
      console.log(data)
      cardNews.remove()
      return data

    } catch (error) {
      console.error(error)

    }

  })




  const btnUpdateNews = document.createElement('button')
  btnUpdateNews.setAttribute('class', 'btn_card_news btn_update_news')
  btnUpdateNews.setAttribute('id', 'btn_update_news')
  btnUpdateNews.textContent = 'Изменить'

  //

  cardNews.appendChild(dateNews)
  cardNews.appendChild(titleNews)
  cardNews.appendChild(btnBoxNews)
  btnBoxNews.appendChild(btnDelNews)
  btnBoxNews.appendChild(btnUpdateNews)


  containerNews.appendChild(cardNews);
  })
}


getAllNewsCard()


const backBtn = document.getElementById('select_news_back_btn')
console.log(backBtn)


backBtn.addEventListener('click', () => {
  console.log('click')


  window.location.href = '/main'
})

